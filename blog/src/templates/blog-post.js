import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pageContext

    return (
      <Layout>
        <div className="content">
          <p className="post-date">
            {post.frontmatter.date}
          </p>
          <article>
            <Helmet title={`${siteTitle} | ${post.frontmatter.title}`} />
            <h1>{post.frontmatter.title}</h1>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
          <style jsx>{`
            article {
              margin: 0 auto 40px auto;
              width: 540px;
              font-size: 18px;
            }
            p.post-date {
              top: 0;
              float: right;
            }
            article h1 {
              font-size: 1.8em;
            }
            @media (max-width: 620px) and (min-resolution: 150dpi) {
              article {
                width: 100%;
              }
              .post-content {
                font-size: 16px;
              }
            }
            `}</style>
            {/* TODO: would be nice if we could figure out why some styles only work if global */}
            <style jsx global>{`
            article ul, article ul li, article li p {
              margin: 0;
            }
            article h2 {
              font-size: 1.4em;
            }
            article h3, h4, h5, h6 {
              font-size: 1.2em;
            }
            article blockquote {
              border-left: 4px solid #afafaf;
              margin-left: 15px;
              padding-left: 10px;
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
