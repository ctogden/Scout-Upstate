import React from 'react'
import Link from 'next/link'

export default (props) => (
  <span>
    <Link href={props.href}>
      <a>
        <img src="/static/images/external-link-icon.png" />
      </a>
    </Link>
    <style jsx>{`
      img {
        position: relative;
        top: -10px;
        right: -2px;
      }
    `}</style>
  </span>
)
