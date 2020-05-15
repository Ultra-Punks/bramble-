import axios from 'axios'

// action types:
const GET_SINGLE_COMMENT = 'GET_SINGLE_COMMENT'

// action creator:
const getSingleComment = comment => {
  return {
    type: GET_SINGLE_COMMENT,
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

// initial state:
const initialState = {}

// create the reducer below:
export default function singleCommentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_COMMENT:
      return action.comment
    default:
      return state
  }
}
