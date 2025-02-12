import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  padding-right: 7px;
`

const CommentProfilePic = styled.div`
  padding: 20px;
  display: flex;
`
// const CommentHandle = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding-left: 2%;
// `
const CommentHeader = styled.div`
  background-color: rgba(60, 78, 96, 0.879);
  display: flex;
  align-items: center;
`

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
            <CommentHeader>
              <CommentProfilePic to={`/u/${commenter.username}`}>
                <img src={commenter.profileImg} className="commentImg" />
              </CommentProfilePic>
              <StyledLink to={`/u/${commenter.username}`}>
                <p>{commenter.name}</p>
              </StyledLink>
              <StyledLink to={`/u/${commenter.username}`}>
                <p>@{commenter.username}</p>
              </StyledLink>
              {/* <CommentHandle> */}
              {/* <StyledLink to={`/u/${commenter.username}`}>
                  <p>{commenter.name}</p>
                </StyledLink>
                <StyledLink to={`/u/${commenter.username}`}>
                  <p>@{commenter.username}</p>
                </StyledLink> */}
              {/* </CommentHandle> */}
            </CommentHeader>
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
