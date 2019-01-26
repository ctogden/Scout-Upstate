import React from 'react'
import { Link } from 'gatsby'

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.displayMenu = this.displayMenu.bind(this);
  }

  displayMenu() {
    var navMenu = document.getElementById("nav-menu");
    navMenu.style.display = window.getComputedStyle(navMenu).display;
    navMenu.style.display = navMenu.style.display === "none" ? "block" : "none";
  }

  render() {
    return (
      <header className="root">
        <nav className="clearfix">
          <input
            type="button"
            className="menu-button"
            value="Menu"
            onClick={this.displayMenu}
          />
          <ul id="nav-menu">
            <li>
              <a className="nav-link" href="/guide">
                Guide
              </a>
            </li>
            <li>
              <a className="nav-link" href="/calendar">
                Calendar
              </a>
            </li>
            <li>
              <Link className="nav-link" to="/">
                Journal
              </Link>
            </li>

            {/* TODO: Add search bar on right, before 'About' once search functionality implemented */}
            <li className="right-nav">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
        </nav>
        <div className="clearfix">
          <a className="nav-link" href="/">
              <h1 className="site-name">Scout Upstate</h1>
          </a>
          <Link className="nav-link" to="/">
            <h2 className="page-name">{this.props.children}</h2>
          </Link>
        </div>
        <style jsx global>{`
          * {
            font-family: "Roboto";
            font-size: 1em;
          }
          .clearfix:after {
            content: "";
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
          body > div:first-child {
            height: 100%;
            width: 80%;
            margin: 0 auto;
          }
          #___gatsby {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          #___gatsby > div {
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
          a.nav-link {
            color: #4f4f4f;
            text-decoration: none;
          }
          .focusMeRootDiv {
            height: 0;
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
          a:hover {
            color: #000000;
          }
          .site-name {
            font-family: "Lato", sans-serif;
            font-size: 3em;
          }
          .page-name {
            float: right;
            margin-top: -10px;
            font-family: "Roboto", sans-serif;
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
    );
  }
}

export default Header;
