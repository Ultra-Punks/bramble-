/* eslint-disable react/jsx-key */
import React from 'react'
import PostPreview from './PostPreview'
import history from '../history'

export default function PostFeed(props) {
  if (props.postFeed) {
    if (props.posts.length) {
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
                  loggedInUser={props.loggedInUser}
                />
              )
            })}
        </div>
      )
    } else {
      return (
        <p className="empty-feed">It's looking pretty empty around here...</p>
      )
    }
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
                onClick={() => history.push(`/p/${post.id}`)}
              />
            )
          }
        })}
      </div>
    )
  }
}
