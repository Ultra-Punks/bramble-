import React, {Component} from 'react'
import {connect} from 'react-redux'

//import thunk:
import {fetchSingleComment} from '../store/singleComment'
import {fetchProfile} from '../store/singleProfile'

// import {fetchUser} from '../store/user'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

class SingleComment extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    // const id = this.props.match.params.commentId
    this.props.fetchSingleComment()
    // const profile = this.props.match.params.profile
    this.props.fetchProfile(3)
    // this.props.fetchUser(3)
  }

  render() {
    // console.log('props???>>>>>', this.props)
    // console.log('THIS.STATE>>>>', this.state)
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
  console.log('this is STATE>>>>>', state)
  return {
    singleComment: state.singleComment,
    profile: state.singleProfile
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  // establish variable for user?
  const commentId = ownProps.match.params.commentId

  return {
    fetchSingleComment: () => dispatch(fetchSingleComment(commentId)),
    fetchProfile: username => dispatch(fetchProfile(username))
    // fetchUser: (userId) => dispatch(fetchUser(userId)),
  }
}

export default connect(mapToState, mapToDispatch)(SingleComment)
