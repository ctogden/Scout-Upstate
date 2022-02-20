import React from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

var _ = require('lodash')

export default class extends React.Component {
  static async getInitialProps() {
    const res = await fetch('https://scout-upstate-guide.vercel.app/api/places')
    const data = await res.json()
    const rows = _.filter(data, function (e) {
      return (
        e.fields.Ready === true &&
        (e.fields.OpenToPublic === true ||
          _.includes(e.fields.Category, 'Lodging'))
      )
    })

    return { rows }
  }

  constructor(props) {
    super(props)
    this.state = { categoryFilters: [], majorCategoryFilters: [] }
  }

  toggleCategoryFilter(filter, event) {
    var categories = this.state.categoryFilters.slice()

    if (!_.includes(categories, filter)) {
      categories.push(filter)
      event.currentTarget.style.backgroundColor = '#e4d18c'
    } else {
      _.pull(categories, filter)
      event.currentTarget.style.backgroundColor = '#f7f1dc'
    }

    this.setState({ categoryFilters: categories })
  }

  toggleMajorCategoryFilter(filter, event) {
    var majorCategories = this.state.majorCategoryFilters.slice()

    if (!_.includes(majorCategories, filter)) {
      majorCategories.push(filter)
      event.currentTarget.style.backgroundColor = '#e4d18c'
    } else {
      _.pull(majorCategories, filter)
      event.currentTarget.style.backgroundColor = '#f7f1dc'
    }

    this.setState({ majorCategoryFilters: majorCategories })
  }

  render() {
    const categories = [
      'Airbnbs',
      'Antiques',
      'Art',
      'Bakery',
      'Barbecue',
      'Bars/Pubs',
      'Berry Picking',
      'Biking',
      'Books',
      'Breweries',
      'Burgers',
      'Cafes',
      'Camping',
      'Catering',
      'Caverns',
      'Cheeses',
      'Christmas Trees',
      'Climbing',
      'Diners',
      'Distilleries',
      'Drive-in Theatres',
      'Farms',
      'Farm Stands',
      'General Stores',
      'Golf',
      'Historical Sites',
      'Horseback Riding',
      'Ice Cream',
      'Kids',
      'Lodging',
      'Maple Syrup',
      'Museums',
      'Music',
      'Orchards',
      'Performing Arts',
      'Restaurants',
      'River Sports',
      'Roadside',
      'Seasonal',
      'Skiing',
      'Smokehouses',
      'Stores',
      'Summer Camps',
      'Swimming',
      'Theatres',
      'Vegan',
      'Water Sports',
      'Wedding Venues',
      'Wineries',
    ]

    const majorCategories = [
      'Outdoor Activities',
      'Indoor Activities',
      'Places to Eat',
      'Places to Stay',
    ]

    return (
      <div className="wrapper">
        <Header title="Categories">Categories</Header>
        <div className="content">
          <div className="category-filters">
            <h3>Filter by category:</h3>
            <div className="major-categories-grid">
              {' '}
              {/* TODO: refactor major category toggle as a component */}
              <div
                className="major-category-toggle"
                onClick={this.toggleMajorCategoryFilter.bind(
                  this,
                  'Outdoor Activities'
                )}
              >
                <h1>Outdoor Activities</h1>
              </div>
              <div
                className="major-category-toggle"
                onClick={this.toggleMajorCategoryFilter.bind(
                  this,
                  'Indoor Activities'
                )}
              >
                <h1>Indoor Activities</h1>
              </div>
              <div
                className="major-category-toggle"
                onClick={this.toggleMajorCategoryFilter.bind(
                  this,
                  'Places to Eat'
                )}
              >
                <h1>Places to Eat</h1>
              </div>
              <div
                className="major-category-toggle"
                onClick={this.toggleMajorCategoryFilter.bind(
                  this,
                  'Places to Stay'
                )}
              >
                <h1>Places to Stay</h1>
              </div>
            </div>
            <div className="tag-filters">
              <h3>Filter by tag:</h3>{' '}
              {/* TODO: find a cleaner way to add tags, displaying all tags is starting to take up too much screen space. In the meantime, let's hide on smaller screens */}
              {categories.map((category) => (
                <button
                  className="filter-button"
                  onClick={this.toggleCategoryFilter.bind(this, category)}
                  key={category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="attractions">
            {this.props.rows.map((place) =>
              (this.state.majorCategoryFilters.length === 0 ||
                _.intersection(
                  this.state.majorCategoryFilters,
                  place.fields.Category
                ).length > 0) &&
              (this.state.categoryFilters.length === 0 ||
                _.intersection(
                  this.state.categoryFilters,
                  place.fields.Category
                ).length > 0) ? (
                <div className="place" key={place.id}>
                  <h3>
                    <Link
                      href={`/guide/attraction?slug=${place.fields.Slug}`}
                      as={`/guide/attraction/${place.fields.Slug}`}
                    >
                      <a>{place.fields.Name}</a>
                    </Link>
                  </h3>
                  <ReactMarkdown source={place.fields.Description} />
                </div>
              ) : null
            )}
          </div>
        </div>
        <Footer />
        <style jsx>{`
          .content {
            margin-top: -30px;
            border-sizing: border-box;
          }
          div.attractions {
            width: 100%;
            margin: 0 auto;
            padding: 0;

            column-gap: 0;
            -webkit-column-gap: 0;
          }
          @media (max-width: 530px) {
            div.attractions {
              column-count: 1;
              -webkit-column-count: 1;
            }
          }
          @media (max-width: 795px) and (min-width: 531px) {
            div.attractions {
              column-count: 2;
              -webkit-column-count: 2;
            }
          }
          @media (max-width: 1160px) and (min-width: 796px) {
            div.attractions {
              column-count: 3;
              -webkit-column-count: 3;
            }
          }
          @media (min-width: 1161px) {
            div.attractions {
              column-count: 4;
              -webkit-column-count: 4;
            }
          }
          div.place {
            break-inside: avoid;
            page-break-inside: avoid;
            -webkit-column-break-inside: avoid;

            box-sizing: border-box;
            min-width: 200px;
            background: #f5f5dc;
            margin: 0 10px 20px 10px;
            padding: 12px;
            border-radius: 2 px;
          }
          h3 {
            font-size: 1.2em;
          }
          div.category-filters {
            margin: 0 10px 20px 10px;
          }
          button.filter-button {
            border: 2px solid #905b35;
            border-radius: 25px;
            box-shadow: none;
            background: #f7f1dc;
            margin: 4px;
            padding: 6px 10px;
            cursor: grab;
          }
          .major-categories-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-column-gap: 15px;
            grid-row-gap: 15px;
            margin-bottom: 30px;
          }
          .major-category-toggle {
            background-color: #f7f1dc;
            height: 150px;
            margin: 0;
            padding: 20px;
            border: 2px solid #905b35;
            border-bottom: 8px solid #905b35;
            border-radius: 5px;
            cursor: grab;
          }
          h1 {
            font-size: 1.4em;
          }
          @media (max-width: 840px) {
            @supports (display: grid) {
              .major-categories-grid {
                margin: 0 auto;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(2, 1fr);
                width: 100%;
              }
            }
            @supports not (display: grid) {
              .major-categories-grid {
                display: block;
                margin: 0;
                box-sizing: border-box;
                width: 100%;
              }
              .major-category-toggle {
                box-sizing: border-box;
                display: inline-block;
                float: left;
                width: calc(50% - 5px);
                margin-bottom: 10px;
              }
              .major-category-toggle:nth-child(odd) {
                margin-right: 10px;
              }
            }
            .major-category-toggle {
              height: 100px;
              padding: 10px;
            }
            h1 {
              font-size: 1em;
            }
          }
          .tag-filters {
            display: none;
          }
        `}</style>
      </div>
    )
  }
}
