const fetch = require('node-fetch');
const microCors = require('micro-cors')
const url = require('url')
const cors = microCors({ allowMethods: ['GET'] })

var _ = require('lodash/core')

var data;
var lastDatetime;

var fetchPage = async function(records, offset) {

  const init = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.AIRTABLE_API_KEY
    }
  };

  var url = 'https://api.airtable.com/v0/app28CA7UaxwXn7l4/Places'
  if (offset !== '')
    url += '?offset=' + encodeURIComponent(offset);

  return await fetch(url, init)
  .then(response => response.json())
  .then(function(json){
    if (typeof json.offset === 'undefined'){
      console.log(json)
      return records.concat(_.values(json.records));
    }
    else {
      console.log(json)
      return fetchPage(records.concat(_.values(json.records)), json.offset);
    }
  });
}

module.exports = cors(async function (req, res){
  currentDatetime = new Date();
  if (typeof lastDatetime === 'undefined'){
    lastDatetime = new Date(0);
  }

  // get new data from Airtable every 5 minutes
  if (currentDatetime - lastDatetime > 300000){
    console.log("Fetching fresh copy of the Airtable sheet");
    data = await fetchPage([], '');
    lastDatetime = currentDatetime;
  }

  var queryString = url.parse(req.url, true).query;
  if (queryString.slug){
    return _.filter(data, function(o){
      return o.fields.Slug === queryString.slug;
    })
  }

  return data;
});
