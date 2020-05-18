/* eslint-disable react/jsx-key */
import React from 'react'
import FeedPostPreview from './FeedPostPreview'

export default function FollowingFeed(props) {
  if (props.posts) {
    const {posts} = props
    return (
      <div className="feedView">
        {posts.map(post => {
          return <FeedPostPreview key={post.id} post={post} />
        })}
      </div>
    )
  } else {
    return <div />
  }
}
