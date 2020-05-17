/* eslint-disable react/jsx-key */
import React, {useState} from 'react'
import PostPreview from './PostPreview'

// import axios from 'axios'

export default function PostFeed(props) {
  console.log('props from postFeed>>>>', props)
  if (props.postFeed) {
    return (
      <div className="feedView">
        {Array.isArray(props.posts) &&
          props.posts.map(post => {
            return (
              <PostPreview
                key={post.id}
                post={post}
                profile={props.profile}
                className="all-comment-preview-container"
              />
            )
          })}
      </div>
    )
  } else {
    return (
      <div className="gallery-container">
        {props.posts.map(post => {
          if (post.photos[0] !== undefined) {
            return (
              <img
                key={post.photos[0].id}
                src={post.photos[0].imgFile}
                className="gallery-photo"
              />
            )
          }
        })}
      </div>
    )
  }
}
