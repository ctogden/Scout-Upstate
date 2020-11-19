import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.displayMenu = this.displayMenu.bind(this)
  }

  displayMenu() {
    var navMenu = document.getElementById('nav-menu')
    navMenu.style.display = window.getComputedStyle(navMenu).display
    navMenu.style.display = navMenu.style.display === 'none' ? 'block' : 'none'
  }

  render() {
    return (
      <header className="root">
        <Head>
          <meta charSet="utf-8" />
          <title>Scout Upstate - {this.props.title}</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/css/normalize.css" />
          <link rel="stylesheet" href="/static/css/carousel.css" />
          <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.js" />
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css"
            rel="stylesheet"
          />
          <meta
            property="og:image"
            content="https://scout-app.now.sh/static/images/compassrose.png"
          />
          <meta
            property="og:description"
            content="Scout Upstate is your guide to Upstate New York, particularly the Catskills and the Hudson Valley region. Browse our directory of attractions for  a curated list of places to see and check out our blog & calendar to stay on top of local events."
          />
          <link
            rel="apple-touch-icon"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/manifest.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
          <meta
            name="msapplication-config"
            content="/static/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <nav className="clearfix">
          <input
            type="button"
            className="menu-button"
            value="Menu"
            onClick={this.displayMenu}
          />
          <ul id="nav-menu">
            <li>
              <Link href="/guide">
                <a>Guide</a>
              </Link>
            </li>
            <li>
              <a href="/journal/">Journal</a>
            </li>

            {/* TODO: Add search bar on right, before 'About' once search functionality implemented */}
            <li className="right-nav">
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="clearfix">
          <Link href="/">
            <a>
              <h1 className="site-name">Scout Upstate</h1>
            </a>
          </Link>
          <h2 className="page-name">{this.props.children}</h2>
        </div>
        <style jsx global>{`
          * {
            font-family: 'Roboto';
            font-size: 1em;
          }
          .clearfix:after {
            content: '';
            display: block;
            clear: both;
          }
          html,
          body {
            height: 100%;
          }
          body {
            min-height: 100%;
            display: flex;
            flex-direction: column;
          }
          body > div {
            width: 80%;
            margin: 0 auto;
          }
          #__next {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          #__next > div {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .wrapper {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .content {
            flex: 1;
          }
        `}</style>
        <style jsx>{`
          .root {
            margin-bottom: 40px;
          }
          .menu-button {
            border: 0;
            background: none;
            box-shadow: none;
            border-radius: 0;

            background: #905b35;
            color: white;
            padding: 8px;
            margin-top: 20px;

            background-image: url(/static/images/hamburger-icon.png);
            background-repeat: no-repeat;
            background-position: left;
            padding-left: 35px;

            float: right;
          }
          ul {
            list-style: none;
          }
          li {
            display: inline-block;
            margin-right: 14px;
            line-height: 175%;
          }
          a {
            color: #4f4f4f;
            text-decoration: none;
          }
          a:hover {
            color: #000000;
          }
          .site-name {
            font-family: 'Lato', sans-serif;
            font-size: 3em;
          }
          .page-name {
            float: right;
            margin-top: -10px;
            font-family: 'Roboto', sans-serif;
            font-size: 1.5em;
            color: #4f4f4f;
          }

          @media (min-width: 501px) {
            #nav-menu {
              display: block;
            }
            nav {
              border-bottom: 1px solid #4f4f4f;
            }
            .menu-button {
              display: none;
            }
            .right-nav {
              float: right;
              margin-right: 40px;
            }
          }
          @media (max-width: 500px) {
            #nav-menu {
              display: none;
              float: right;
              width: 100%;
              line-height: 2em;
            }
            nav ul li {
              display: block;
            }
          }
        `}</style>
      </header>
    )
  }
}

export default Header
