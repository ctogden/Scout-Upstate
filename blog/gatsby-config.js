module.exports = {
  siteMetadata: {
    title: 'Scout Upstate - Journal',
    author: 'Chris Ogden',
    description: 'Your guide to Upstate New York.',
    siteUrl: 'https://scoutupstate.com/journal',
  },
  pathPrefix: `/journal`,
  plugins: [
    `gatsby-plugin-styled-jsx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`
  ],
}
