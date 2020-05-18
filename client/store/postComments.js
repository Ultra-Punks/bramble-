// will need to import axios...
import axios from 'axios'

// action types go here:
const GET_POST_COMMENTS = 'GET_POST_COMMENTS'

// action creators go here:
const getPostComments = comments => ({
  type: GET_POST_COMMENTS,
  comments
})

// =================================================
// // thunk creators below (remember, this returns an async function!)
// export const fetchComments = (id) => {
//   return async (dispatch) => {
//     try {
//       // get all the post's comments
//       const {data} = await axios.get(`/api/comments/on/${id}`)
//       dispatch(getPostComments(data))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
// =================================================

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

const initialState = []

// reducer here:
export default function allPostCommentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_COMMENTS:
      return [...action.comments]
    default:
      return state
  }
}
