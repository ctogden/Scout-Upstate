import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import "isomorphic-fetch";

var _ = require("lodash");

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: ""
    };
  }
  render() {
    return (
      <div className="wrapper">
        <Header title="Guide">Guide</Header>
        <div className="content">
          <Link prefetch href="/guide/categories">
            <div className="card categories">
              <h3>Browse by category</h3>
              <div className="description">
                Like outdoor activities? See our recommendations for hiking,
                camping, kayaking, golf, and more. Prefer to stay indoors? Check
                out our listings for book stores, antiques, museums,
                restaurants, etc. We have something for everyone.
              </div>
            </div>
          </Link>
          <div className="callout feature-1">
            <div className="newsletter-signup">
              <h4>Newsletter</h4>
              <h5>The best of upstate, weekly</h5>
              <form
                action="https://scoutupstate.us12.list-manage.com/subscribe/post"
                method="POST"
                noValidate
              >
                <input
                  type="hidden"
                  name="u"
                  value="276674ceb2a98e9d6dd11dbd5"
                />
                <input type="hidden" name="id" value="f8ce6b453e" />
                <input
                  type="email"
                  className="email-input"
                  value={this.state.emailValue}
                  onChange={e => {
                    this.setState({ emailValue: e.target.value });
                  }}
                  autoCapitalize="off"
                  placeholder="Enter your email address"
                  autoCorrect="off"
                  name="MERGE0"
                  id="MERGE0"
                  size="25"
                />
                <input type="submit" className="submit-button" value="Submit" />
              </form>
            </div>
          </div>
          <Link prefetch href="/guide/map">
            <div className="card map">
              <h3>View on map</h3>
              <div className="description">
                View a map with all of our featured attractions.
              </div>
            </div>
          </Link>
          <div className="card towns">
            <div className="towns-overlay">
              <h3>Browse by town/county coming soon!</h3>
            </div>
            <h3>Browse by town/county</h3>
            <div className="description">
              Search for attractions by town or county, featuring dozens of
              towns including Walton, Bovina, Kingston, Andes, Hobart, and
              Roxbury.
            </div>
          </div>
          <a
            className="no-link-decoration"
            href="https://www.instagram.com/scout_upstate/"
          >
            <div className="callout feature-2">
              <span className="featured">Follow</span>
            </div>
          </a>
        </div>
        <Footer />
        <style jsx>{`
          .content {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 20px;
            grid-auto-rows: 280px;
          }
          .towns {
            grid-column: 1;
            grid-row: 3 / 5;
            background-color: #70dec5;
            background-image: url(/static/images/town.jpg);
            background-position: center 60px;
            background-repeat: no-repeat;
            background-size: 70%;
            position: relative;
            cursor: grab;
          }
          .towns-overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: 0.2s ease-out;
            background-color: #70dec5;
          }
          .towns:hover .towns-overlay {
            opacity: 1;
          }
          .towns:hover .description {
            opacity: 0;
          }
          .categories {
            grid-column: 1;
            grid-row: 1 / 3;
            background-color: #f3d2bf;
            background-image: url(/static/images/categories.jpg);
            background-position: center 60px;
            background-repeat: no-repeat;
            background-size: 70%;
            position: relative;
            cursor: grab;
          }
          .map {
            grid-column: 2;
            grid-row: 2 / 4;
            background-color: #f3e49a;
            background-image: url(/static/images/map.jpg);
            background-position: center 60px;
            background-repeat: no-repeat;
            background-size: 70%;
            position: relative;
            cursor: grab;
          }
          .callout {
            background-color: #d2caca;
          }
          a.no-link-decoration {
            color: inherit;
            text-decoration: none;
          }
          .feature-1 {
            grid-column: 2;
            grid-row: 1;
          }
          .feature-2 {
            grid-column: 2;
            grid-row: 4;
            height: 100%;
            background-image: url("/static/images/feature3.png");
            background-size: contain;
            background-position: left bottom;
            background-repeat: no-repeat;
          }
          h3 {
            margin: 20px;
            font-size: 1.8em;
            color: white;
            text-shadow: 1px 1px #656464;
          }
          h3:hover {
            text-decoration: underline;
          }
          .featured {
            padding: 5px;
            background-color: #f9e789;
          }
          .description {
            margin: 20px;
            font-size: 1.3em;
            color: white;
            text-shadow: 1px 1px #656464;
            position: absolute;
            bottom: 0;
          }
          .newsletter-signup {
            width: 80%;
            margin: 20px auto;
          }
          .newsletter-signup h4, h5 {
            font-size: 2em;
            color: white;
            margin-top: 25px;
            margin-bottom: 10px;
          }
          .newsletter-signup h4 {
            margin-top: 45px;
          }
          .email-input {
            border: none;
            margin-top 15px;
            padding: 10px;
            height: 40px;
            width: 90%;
          }
          .newsletter-signup .submit-button {
            display: none;
          }

          @media (max-width: 1060px) {
            .newsletter-signup h4, h5 {
              font-size: 1.4em;
            }
            .newsletter-signup h5 {
              margin-top: 25px;
            }
            .newsletter-signup h4 {
              margin-top: 10px;
            }
          }

          @media (max-width: 560px) {
            .towns-overlay {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              height: 100%;
              width: 100%;
              opacity: 1;
              background-color: #70dec5;
            }
            .towns .description {
              opacity: 0;
            }
            @supports (display: grid) {
              .content {
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 20px;
                grid-auto-rows: 220px;
              }
              .towns {
                grid-column: 1;
                grid-row: 7 / 9;
              }
              .categories {
                grid-column: 1;
                grid-row: 1 / 3;
              }
              .map {
                grid-column: 1;
                grid-row: 4 / 6;
              }
              .feature-1 {
                grid-column: 1;
                grid-row: 3;
              }
              .feature-2 {
                grid-column: 1;
                grid-row: 6;
              }
              .feature-3 {
                grid-column: 1;
                grid-row: 9;
              }
              .feature-4 {
                grid-column: 1;
                grid-row: 10;
              }
            }
            @supports not (display: grid) {
              h3 {
                padding-top: 10px;
              }
              .callout {
                height: 220px;
                margin-bottom: 20px;
              }
              .card {
                height: 460px;
                margin-bottom: 20px;
              }
            }
          }
        `}</style>
      </div>
    );
  }
}
