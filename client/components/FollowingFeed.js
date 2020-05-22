/* eslint-disable react/jsx-key */
import React from 'react'
import FeedPostPreview from './FeedPostPreview'

export default function FollowingFeed(props) {
  if (props.posts) {
    const {posts} = props
    return (
      <div className="home-feed-view">
        {posts.map(post => {
          return (
            <FeedPostPreview
              key={post.id}
              post={post}
              loggedInUser={props.loggedInUser}
            />
          )
        })}
      </div>
    )
  } else {
    return <div />
  }
}
