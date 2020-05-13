import React from 'react'
// import axios from 'axios'

export default function PostFeed(props) {
  if (props.postFeed) {
    return <div>Posts Feed</div>
  } else {
    return (
      <div className="gallery-container">
        {props.images.map(image => {
          return (
            <img
              key={image.filename}
              className="gallery-photo"
              src={image.url}
            />
          )
        })}
      </div>
    )
  }
}
