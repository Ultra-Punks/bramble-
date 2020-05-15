import React, {Component} from 'react'
import {connect} from 'react-redux'

//import thunk:
import {fetchSingleComment} from '../store/singleComment'
import {fetchUser} from '../store/user'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

class SingleComment extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const id = this.props.match.params.commentId
    this.props.fetchSingleComment(id)
    // this.props.fetchUser(3)
  }

  render() {
    console.log('props???>>>>>', this.props)
    const comment = this.props.singleComment.comment
    return (
      <div className="commentContainer">
        <div className="singleComment">
          <div className="commentHeader">
            <ul>COMMENTER PHOTO:</ul>
            <ul>COMMENTER USERNAME:</ul>
          </div>
          <div className="commentWriting">{comment}</div>
          <div className="commentShareBar">
            <img
              src="https://img.icons8.com/all/500/comments.png"
              className="commentIcon"
            />
            <img
              src="https://img.icons8.com/ios/64/000000/like.png"
              className="likeIcon"
            />
            <img
              src="https://img.icons8.com/windows/80/000000/dislike.png"
              className="dislikeIcon"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapToState = state => {
  return {
    singleComment: state.singleComment,
    user: state.user
  }
}

const mapToDispatch = dispatch => {
  // establish variable for user?
  return {
    fetchSingleComment: comment => dispatch(fetchSingleComment(comment))

    // fetchUser: (userId) => dispatch(fetchUser(userId)),
  }
}

export default connect(mapToState, mapToDispatch)(SingleComment)
