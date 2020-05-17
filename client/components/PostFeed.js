/* eslint-disable react/jsx-key */
import React from 'react'
import {Image} from 'react-bootstrap'
// import axios from 'axios'

function PostingPictures(props) {
  const {post} = props
  if (post.photos[0] !== undefined) {
    return <img src={post.photos[0].imgFile} className="post-images" />
  } else {
    return <div />
  }
}

export default function PostFeed(props) {
  // console.log('props from postFeed>>>>', props)
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
                  <div className="commentRepliesContainer">
                    <img
                      src="https://img.icons8.com/all/500/comments.png"
                      className="commentIcon"
                      type="button"
                      // onClick={props.handleComments}
                    />
                    <p
                      className="seeReplies"
                      type="button"
                      onClick={props.handleComments}
                    >
                      See Replies
                    </p>
                  </div>
                  {/* <div className="likesAndDislikes"> */}
                  <div className="likes">
                    {/* {likes >= 1 && (
                      <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                        {likes}
                      </div>
                    )} */}
                    <img
                      src="https://img.icons8.com/ios/64/000000/like.png"
                      className="likeIcon"
                      type="button"
                      // onClick={() => this.likeComment()}
                    />
                  </div>
                  <div className="dislikes">
                    {/* {dislikes >= 1 && (
                      <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                        {dislikes}
                      </div>
                    )} */}
                    <img
                      src="https://img.icons8.com/windows/80/000000/dislike.png"
                      className="dislikeIcon"
                      type="button"
                      // onClick={() => this.dislikeComment()}
                    />
                  </div>
                  {/* </div> */}
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
