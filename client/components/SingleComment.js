import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//import thunk:
import {
  fetchSingleComment,
  likeComment,
  dislikeComment
} from '../store/singleComment'
import {fetchProfile} from '../store/singleProfile'

// import {fetchUser} from '../store/user'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

class SingleComment extends Component {
  constructor() {
    super()

    this.likeComment = this.likeComment.bind(this)
    this.dislikeComment = this.dislikeComment.bind(this)
  }

  componentDidMount() {
    // const id = this.props.match.params.commentId
    this.props.fetchSingleComment()
    // const profile = this.props.match.params.profile
    this.props.fetchProfile()
    // this.props.fetchUser(3)

    this.props.fetchLikes()
    this.props.fetchDislikes()
  }

  likeComment() {
    console.log('BEFORE INCREMENT>>>>>', this.props.singleComment.likes)
    this.props.singleComment.likes++
    console.log('clicked LIKE Comment! +1')
    console.log('AFTER INCREMENT>>>>>', this.props.singleComment.likes)
  }

  dislikeComment() {
    console.log('BEFORE INCREMENT>>>>>', this.props.singleComment.dislikes)
    this.props.singleComment.dislikes++
    console.log('cliked DISLIKE comment!')
    console.log('AFTER INCREMENT>>>>>', this.props.singleComment.dislikes)
  }

  render() {
    console.log('props>>>>>', this.props)
    const commenter = this.props.singleComment.user
    console.log('COMMENTER???>>>>', commenter)
    const {likes, dislikes, comment} = this.props.singleComment
    // const comment = this.props.singleComment.comment
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
                onClick={() => this.likeComment()}
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
                onClick={() => this.dislikeComment()}
              />
            </div>
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
    fetchProfile: username => dispatch(fetchProfile(username)),
    fetchLikes: () => dispatch(likeComment(commentId)),
    fetchDislikes: () => dispatch(dislikeComment(commentId))
    // fetchUser: (userId) => dispatch(fetchUser(userId)),
  }
}

export default connect(mapToState, mapToDispatch)(SingleComment)
