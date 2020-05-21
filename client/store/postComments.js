// will need to import axios...
import axios from 'axios'

// action types go here:
const GET_POST_COMMENTS = 'GET_POST_COMMENTS'

const ADD_POST_COMMENT = 'ADD_POST_COMMENT'

// action creators go here:
const getPostComments = comments => ({
  type: GET_POST_COMMENTS,
  comments
})

const addPostComment = comment => ({
  type: ADD_POST_COMMENT,
  comment
})

export const fetchComments = () => {
  return async dispatch => {
    try {
      // get all the post's comments
      const {data} = await axios.get(`/api/comments/`)
      dispatch(getPostComments(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addCommentThunk = (postId, comment) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/comments/add/${postId}`, {
        comment: comment
      })
      dispatch(addPostComment(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

// reducer here:
export default function allPostCommentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_COMMENTS:
      return [...action.comments]
    case ADD_POST_COMMENT:
      return [action.comment, ...state]
    default:
      return state
  }
}
