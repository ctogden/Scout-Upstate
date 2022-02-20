import React, { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import ExternalLink from '../../../components/external-link'
import Error from 'next/error'

var Carousel = require('react-responsive-carousel').Carousel
var _ = require('lodash/core')

const place = (props) => {
  //const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (props.Lat && props.Lon) {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiY3RvZ2RlbiIsImEiOiJjamMxMjA0ZXQwMWozMzNvOTd4a3B0aTZjIn0.KzJ79r9nBEqSGYUGsMQttg'

      let map = new mapboxgl.Map({
        // container id specified in the HTML
        container: 'map',
        // style URL
        style: 'mapbox://styles/ctogden/cje0e2dgqafeu2slcsp1cqg6b',
        // initial position in [lon, lat] format
        center: [props.Lon, props.Lat],
        // initial zoom
        zoom: 12,
        minZoom: 6,
      })

      var el = document.createElement('div')
      el.className = 'marker'
      new mapboxgl.Marker(el, { offset: [0, -12.5] })
        .setLngLat([props.Lon, props.Lat])
        .addTo(map)
    }
  }, [])

  if (!props.Name) {
    return <Error statusCode={404} />
  }
  else {
    return (
      <div className="wrapper">
        <Header title={props.Name}>
          {props.Name}
          <ExternalLink href={props.Website} />
        </Header>
        <div className="content">
          <div className="basic-info">
            <span className="basic-info">
              <Link href={'http://maps.google.com/?q=' + props.Address}>
                <a>{props.Address}</a>
              </Link>
            </span>
            <span className="basic-info">
              <a href={'tel:' + props.Tel}>{props.Phone}</a>
            </span>
          </div>
          <div className="description">
            <ReactMarkdown source={props.Description} />
            <ReactMarkdown source={props.Hours} />
          </div>
          <div className="photo-box">
            {_.isUndefined(props.Photos) ? (
              <div className="image-placeholder">
                No photos yet. We’ll try to add some soon! You can also{' '}
                <a href="mailto:hello@scoutupstate.com">email</a> us your
                submissions.
              </div>
            ) : (
              <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                dynamicHeight={true}
                autoPlay
              >
                {props.Photos.map((photo) => (
                  <div key={photo.id}>
                    <img src={photo.url} />
                  </div>
                ))}
              </Carousel>
            )}
          </div>{' '}
          {props.Lat && props.Lon ? <div id="map" /> : null}
        </div>
        <Footer />
        <style jsx>{`
          div.basic-info {
            float: right;
            margin-top: -30px;
            margin-bottom: 20px;
          }
          span.basic-info {
            margin-left: 20px;
            text-align: right;
          }
          .description {
            width: 320px;
            margin-top: -10px;
            margin-right: 30px;
            margin-bottom: 20px;
            float: left;
          }
          .photo-box {
            margin-left: 350px;
            width: auto;
          }
          .photo-box img {
            width: 100%;
          }
          .image-placeholder {
            padding: 30px;
            background-color: #e8e8e8;
          }
          #map {
            margin-top: 20px;
            margin-left: 350px;
            width: auto;
            height: 526px;
          }

          @media (max-width: 390px) {
            .description {
              width: 95%;
            }
          }
          @media (max-width: 530px) {
            span.basic-info {
              display: block;
              margin-top: 5px;
            }
          }
          @media (max-width: 700px) {
            #map {
              height: 70vw;
            }
          }
          @media (max-width: 950px) {
            .description {
              float: none;
              padding-top: 40px;
            }
            .photo-box {
              margin-left: 0;
            }
            #map {
              margin-left: 0;
            }
          }
        `}</style>
        <style jsx global>{`
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

export async function getStaticPaths() {
  let response = await fetch('https://scoutupstate.com/api/places')
  let places = await response.json();
  let slugs = places.map(place => 
     place.fields.Slug
  ).filter(slug => slug != undefined)
  return {
    paths: slugs.map(slug => ({
      params: {
        slug: slug
      }
    })),
    fallback: true
  };
}

export async function getStaticProps({params: { slug }}) {
  let response = await fetch('https://scoutupstate.com/api/places?slug=' + slug)
  let place = await response.json();
  place = place['fields'];
  console.log(place);
  return {
    props: place,
  }
}

export default place;