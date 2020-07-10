import Cors from 'cors'
require('dotenv').config()

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function getAirtableData() {
  let airtableBaseUrl = 'https://api.airtable.com/v0/app28CA7UaxwXn7l4/Places'
  let offset = ''
  let results = []

  do {
    let url = airtableBaseUrl
    if (offset != null && offset !== '') {
      url += '?offset=' + offset
    }

    console.log(url)
    await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.AIRTABLE_API_KEY,
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data['records'])
        results.push(...data['records'])
        offset = data['offset']
      })
      .catch((error) => {
        console.log(error)
      })
  } while (offset != null)

  return results
}

async function handler(req, res) {
  let results = await getAirtableData()
  if ('slug' in req.query) {
    results = results.filter(
      (result) => result.fields.Slug === req.query['slug']
    )[0]
  }
  console.log(req.query)

  // Run the middleware
  await runMiddleware(req, res, cors)

  // Cache endpoint for 10 minutes at a time
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')
  res.json(results)
}

export default handler
