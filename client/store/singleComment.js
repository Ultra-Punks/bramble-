import axios from 'axios'

// action types:
const GET_SINGLE_COMMENT = 'GET_SINGLE_COMMENT'
const LIKE_COMMENT = 'LIKE_COMMENT'
const DISLIKE_COMMENT = 'DISLIKE_COMMENT'

// action creator:
const getSingleComment = comment => {
  return {
    type: GET_SINGLE_COMMENT,
    comment
  }
}

const likedComment = comment => {
  return {
    type: LIKE_COMMENT,
    comment
  }
}

const dislikedComment = comment => {
  return {
    type: DISLIKE_COMMENT,
    comment
  }
}

// thunk creator (REMEMBER: this is named export, so will need deconstructed in react component)
export const fetchSingleComment = commentId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/comments/${commentId}`)
      dispatch(getSingleComment(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// LIKE a comment thunk creator
export const likeComment = commentId => {
  return async function(dispatch) {
    try {
      let res = await axios.put(`/api/comments/${commentId}/likes`)
      dispatch(likedComment(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

// DISLIKE a comment thunk creator
export const dislikeComment = comentId => {
  return async function(dispatch) {
    try {
      let res = await axios.put(`/api/comments/${comentId}/dislikes`)
      dispatch(dislikedComment(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

// initial state:
const initialState = {}

// create the reducer below:
export default function singleCommentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_COMMENT:
      return action.comment
    case LIKE_COMMENT:
      return action.comment
    case DISLIKE_COMMENT:
      return action.comment
    default:
      return state
  }
}
