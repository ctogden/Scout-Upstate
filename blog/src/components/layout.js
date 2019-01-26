import React, { Fragment } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { StaticQuery, graphql } from "gatsby"

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header title="Journal">Journal</Header>
        {children}
        <Footer />
      </>
    )}
  />
)

// TODO 

/* class Template extends React.Component {
  render() {
    const { location, children } = this.props

    return (
      <div>
        <Header title="Journal">Journal</Header>
        {children}
        <Footer />
      </div>
    )
  }
}

export default Template */
