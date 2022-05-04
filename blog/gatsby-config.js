module.exports = {
  pathPrefix: `/journal`,
  siteMetadata: {
    title: 'Scout Upstate - Journal',
    author: 'Chris Ogden',
    description: 'Your guide to Upstate New York.',
    siteUrl: 'https://scoutupstate.com/journal',
  },
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-108085598-1",
      },
    },
    // `gatsby-plugin-feed`,  // TODO: set up RSS feed
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
  ],
}
