import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//import thunk:
import {
  fetchSingleComment,
  likeComment,
  dislikeComment
} from '../store/singleComment'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

class SingleComment extends Component {
  componentDidMount() {
    this.props.fetchSingleComment()
  }

  render() {
    const commenter = this.props.singleComment.user
    const {likes, dislikes, comment} = this.props.singleComment
    return (
      <div className="commentContainer">
        <div className="singleComment">
          {/* if commenter exists, then we create the comment header */}
          {commenter !== undefined ? (
            <div className="commentHeader">
              <Link to={`/u/${commenter.username}`}>
                <img src={commenter.profileImg} className="commentImg" />
              </Link>
              <Link to={`/u/${commenter.username}`}>
                <ul>@{commenter.username}</ul>
              </Link>
            </div>
          ) : (
            <p>'loading'</p>
          )}
          <div className="commentWriting">{comment}</div>
          <div className="commentShareBar">
            <div className="likes">
              {likes >= 1 && (
                <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                  {likes}
                </div>
              )}
              <img
                src="https://img.icons8.com/ios/64/000000/like.png"
                className="likeIcon"
                type="button"
                onClick={() => this.props.fetchLikes()}
              />
            </div>
            <div className="dislikes">
              {dislikes >= 1 && (
                <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                  {dislikes}
                </div>
              )}
              <img
                src="https://img.icons8.com/windows/80/000000/dislike.png"
                className="dislikeIcon"
                type="button"
                onClick={() => this.props.fetchDislikes()}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapToState = state => {
  return {
    singleComment: state.singleComment
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  // establish variable for user?
  const commentId = ownProps.match.params.commentId

  return {
    fetchSingleComment: () => dispatch(fetchSingleComment(commentId)),
    fetchLikes: () => dispatch(likeComment(commentId)),
    fetchDislikes: () => dispatch(dislikeComment(commentId))
  }
}

export default connect(mapToState, mapToDispatch)(SingleComment)
