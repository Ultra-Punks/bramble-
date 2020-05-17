import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'

//import thunk:
// import {fetchComments} from '../store/postComments'
// import {fetchProfile} from '../store/singleProfile'

// import {fetchUser} from '../store/user'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

export default function PostComments(props) {
  const {post, openComments} = props
  if (
    post !== undefined &&
    post.postComments !== undefined &&
    post.postComments.length &&
    openComments
  ) {
    const postComments = post.postComments
    return (
      <div className="commentContainer">
        {postComments.map(comment => (
          <div key={comment.id}>
            <div className="singleComment">{comment.comment}</div>
          </div>
        ))}
      </div>
    )
  } else {
    return <div />
  }
}
