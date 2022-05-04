import React from 'react'
import { Link,  graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout>
        <div className="content">
          <div className="journal-content">
            <Helmet title={siteTitle} />
            {posts.map(({ node }) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug
              return (            
                <div className="post-info" key={node.fields.slug}>
                  <Link className="post-link" to={node.fields.slug}>
                  <div className="column">
                    <p className="post-date">{node.frontmatter.date}</p>
                    <h3>{title}</h3>
                  </div>
                  </Link>
                </div>
              )
            })}
          </div>
          <style jsx>{`
            h3 {
              font-size: 1.8em;
              margin-top: 5px;
              overflow: hidden;
            }
            .post-info {
              width: 100%;
              padding: 10px;
            }
            .post-info:nth-child(odd) {
              background-color: #f3f1e4;
            }
            :global(a.post-link) {
              text-decoration: none;
              color: #4f4f4f;
            }
            :global(a.post-link:hover) {
              color: black;
            }
            .post-date {
              margin-bottom: 0;
              font-size: 1em;
            }
            .journal-content {
              margin: 0 auto 40px auto;
              width: 100%;
            }
            .column {
              width: 720px;
              max-width: 100%;
              margin: 0 auto;
            }
            @media (max-width: 620px), (min-resolution: 150dpi) {
              .journal-content {
                width: 100%;
              }
              p {
                font-size: 16px;
              }
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
          }
        }
      }
    }
  }
`
