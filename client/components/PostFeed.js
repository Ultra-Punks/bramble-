/* eslint-disable react/jsx-key */
import React from 'react'
import {Image} from 'react-bootstrap'
// import axios from 'axios'

function PostingPictures(props) {
  const {post} = props
  console.log('RIGHT BEFORE', post)

  if (post.photos[0] !== undefined) {
    return <img src={post.photos[0].imgFile} className="post-images" />
  } else {
    return <div />
  }
}

export default function PostFeed(props) {
  if (props.postFeed) {
    return (
      <div className="feedView">
        {Array.isArray(props.posts) &&
          props.posts.map(post => {
            return (
              <div key={post.id} className="single-post">
                <div className="post-header">
                  <Image
                    className="post-pfp"
                    src={props.profile.profileImg}
                    roundedCircle
                  />
                  <div className="post-info">
                    <div className="post-handle">
                      <p className="handle-text">{props.profile.name}</p>
                      <p className="handle-text">@{props.profile.username}</p>
                    </div>
                    <p className="post-text">{post.description}</p>
                  </div>
                </div>

                <div className="post-photos">
                  <PostingPictures post={post} />
                </div>
                <div className="commentsAndShares">
                  <img
                    src="https://img.icons8.com/all/500/comments.png"
                    className="commentIcon"
                  />
                </div>
                <br />
              </div>
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
