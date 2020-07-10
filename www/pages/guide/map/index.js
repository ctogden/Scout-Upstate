import React from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import ExternalLink from '../../../components/external-link'
import Router from 'next/router'
import 'isomorphic-fetch'

var _ = require('lodash/core')
var GeoJSON = require('geojson')
var map

export default class extends React.Component {
  constructor() {
    super()

    this.handleItemClick = this.handleItemClick.bind(this)
    this.createPopUp = this.createPopUp.bind(this)
  }

  static async getInitialProps({ query: { slug } }) {
    const res = await fetch('https://scoutupstate.com/api/places')
    return {
      data: _.map(
        _.filter(
          _.map(await res.json(), (row) => row.fields),
          (row) =>
            typeof row.Lat !== 'undefined' && typeof row.Lon !== 'undefined'
        ),
        function (row) {
          row.Lat = parseFloat(row.Lat)
          row.Lon = parseFloat(row.Lon)
          return row
        }
      ),
    }
  }

  flyToPlace(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 12,
    })
  }

  createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup')
    // Check if there is already a popup on the map and if so, remove it
    if (popUps[0]) popUps[0].remove()

    var div = window.document.createElement('div')
    var attraction = window.document.createElement('h2')
    attraction.innerHTML = currentFeature.properties.Name
    attraction.setAttribute(
      'style',
      'cursor: grab; cursor:-moz-grab; cursor:-webkit-grab;'
    )
    attraction.style.color = '#00853e'
    attraction.style.fontSize = '1.4em'
    attraction.addEventListener(
      'click',
      () => Router.push('/guide/attraction/' + currentFeature.properties.Slug),
      false
    )
    var address = window.document.createElement('h4')
    address.innerHTML = currentFeature.properties.Address
    div.appendChild(attraction)
    div.appendChild(address)

    var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 35 })
      .setLngLat(currentFeature.geometry.coordinates)
      .setDOMContent(div)
      .addTo(map)

    return popup
  }

  handleItemClick(currentFeature) {
    // 1. Zoom to corresponding location on map
    this.flyToPlace(currentFeature)
    // 2. Close all other popups and display popup for clicked place
    this.createPopUp(currentFeature)
    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
    this.setActiveItem(currentFeature)
  }

  setActiveItem(currentFeature) {
    var features = this.state.attractions.features.map(function (attraction) {
      if (attraction.properties.Slug === currentFeature.properties.Slug) {
        attraction.properties.Active = true
      } else {
        // set the rest to false so we only have at most one active item
        attraction.properties.Active = false
      }
      return attraction
    })

    this.setState({ attractions: { features: features } })
  }

  async componentDidMount() {
    var attractions = GeoJSON.parse(
      Object.keys(this.props.data).map((key) => this.props.data[key]),
      { Point: ['Lat', 'Lon'] }
    )
    this.setState({ attractions: attractions })

    mapboxgl.accessToken =
      'pk.eyJ1IjoiY3RvZ2RlbiIsImEiOiJjamMxMjA0ZXQwMWozMzNvOTd4a3B0aTZjIn0.KzJ79r9nBEqSGYUGsMQttg'

    // This adds the map to your page
    map = new mapboxgl.Map({
      // container id specified in the HTML
      container: 'map',
      // style URL
      style: 'mapbox://styles/ctogden/cje0e2dgqafeu2slcsp1cqg6b',
      // initial position in [lon, lat] format
      center: [-74.526341, 42.155902],
      // initial zoom
      zoom: 8,
      minZoom: 6,
    })

    map.on('load', function (e) {
      // Add the data to your map as a layer
      map.addSource('places', {
        type: 'geojson',
        data: attractions,
      })

      // pretty much the same as createPopUp above, but within scope and doesn't add to map directly
      var createPopUp = function (currentFeature) {
        var div = window.document.createElement('div')
        var attraction = window.document.createElement('h2')
        attraction.innerHTML = currentFeature.properties.Name
        attraction.setAttribute(
          'style',
          'cursor: grab; cursor:-moz-grab; cursor:-webkit-grab;'
        )
        attraction.style.color = '#00853e'
        attraction.style.fontSize = '1.4em'
        attraction.addEventListener(
          'click',
          () =>
            Router.push('/guide/attraction/' + currentFeature.properties.Slug),
          false
        )
        var address = window.document.createElement('h4')
        address.innerHTML = currentFeature.properties.Address
        div.appendChild(attraction)
        div.appendChild(address)

        var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 35 })
          .setLngLat(currentFeature.geometry.coordinates)
          .setDOMContent(div)

        return popup
      }

      attractions.features.forEach((feature) => {
        // Create a div element for the marker
        var el = document.createElement('div')
        // Add a class called 'marker' to each div
        el.className = 'marker'
        // create popup to attach to marker
        var popup = createPopUp(feature)
        // By default the image for your custom marker will be anchored
        // by its center. Adjust the position accordingly
        // Create the custom markers, set their position, and add to map
        new mapboxgl.Marker(el, { offset: [0, -12.5] })
          .setLngLat(feature.geometry.coordinates)
          .setPopup(popup)
          .addTo(map)

        el.addEventListener(
          'click',
          function () {
            // Check if there is already a popup on the map and if so, remove it
            var popUps = document.getElementsByClassName('mapboxgl-popup')
            if (popUps[0]) popUps[0].remove()
          },
          false
        )
      })
    })
  }

  render() {
    var attractionsList =
      this.state !== null && this.state.attractions !== null ? (
        this.state.attractions.features.map((attraction) => (
          <div
            className="item"
            key={attraction.properties.Slug}
            onClick={(e) => this.handleItemClick(attraction, e)}
          >
            <h2>{attraction.properties.Name}</h2>
            <h3>{attraction.properties.Address}</h3>
            <style jsx>{`
              .item {
                background-color: ${attraction.properties.Active
                  ? '#f8f8f8'
                  : 'inherit'};
              }
              .item h2 {
                color: ${attraction.properties.Active ? '#8cc63f' : '#00853e'};
              }
            `}</style>
          </div>
        ))
      ) : (
        <span className="loading-indicator">Loading attractions...</span>
      )
    return (
      <div className="wrapper">
        <Header title="Map">Map</Header>
        <div className="content">
          <div className="sidebar">
            <div className="heading">
              <h1 className="listings-header">Featured Upstate Attractions</h1>
            </div>
            <div className="listings">
              {attractionsList}
              <div className="scroll-spacer" />
            </div>
          </div>
          <div id="map" className="map" />
        </div>
        <Footer />
        <style jsx>{`
          .wrapper {
            display: block;
          }
          .content {
            margin-top: -20px;
            width: auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 500px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
          .sidebar {
            grid-column: 1;
            overflow-y: hidden;
            max-height: 100%;
          }
          .listings-header {
            padding: 10px 10px 10px 5px;
            margin: 0;
            border-bottom: 1px solid #eee;
          }
          .listings {
            overflow-y: scroll;
            height: 100%;
            cursor: grab;
          }
          .map {
            grid-column: 2 / 5;
          }
          .heading h1 {
            font-size: 1.2em;
          }
          .scroll-spacer {
            height: 60px;
          }

          ::-webkit-scrollbar {
            width: 3px;
            height: 3px;
            border-left: 0;
            background: rgba(0, 0, 0, 0.1);
          }
          ::-webkit-scrollbar-track {
            background: none;
          }
          ::-webkit-scrollbar-thumb {
            background: #00853e;
            border-radius: 0;
          }

          @media (max-width: 1040px) {
            .sidebar {
              display: none;
            }
            @supports (display: grid) {
              .map {
                grid-column: 1 / 5;
              }
            }
            @supports not (display: grid) {
              .map {
                width: 100%;
                height: 300px;
              }
            }
          }
        `}</style>
        {/* TODO: why do the following selectors only work as global? */}
        <style jsx global>{`
          .listings .item {
            display: block;
            border-bottom: 1px solid #eee;
            padding: 10px 10px 10px 5px;
            text-decoration: none;
          }
          .listings h2 {
            font-size: 1.1em;
          }
          .listings h3 {
            font-size: 0.8em;
          }
          span.loading-indicator {
            margin: 40px;
          }
          .marker {
            border: none;
            cursor: pointer;
            height: 41px;
            width: 25px;
            background-image: url(/static/images/orange-marker.png);
            background-color: rgba(0, 0, 0, 0);
          }
        `}</style>
      </div>
    )
  }
}
