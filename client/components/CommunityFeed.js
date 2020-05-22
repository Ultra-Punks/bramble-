// * eslint - disable react / jsx - key * /
import React from 'react'
import CommunityPostPreview from './CommunityPostPreview'

export default function PostFeed(props) {
  if (props.postFeed) {
    return (
      <div className="feedView">
        {Array.isArray(props.posts) &&
          props.posts.map(post => {
            return (
              <CommunityPostPreview
                key={post.id}
                post={post}
                className="all-comment-preview-container"
                loggedInUser={props.loggedInUser}
              />
            )
          })}
      </div>
    )
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
