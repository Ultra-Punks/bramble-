import axios from 'axios'

// action types:
const GET_SINGLE_POST = 'GET_SINGLE_POST'

// action creator:
const getSinglePost = post => {
  return {
    type: GET_SINGLE_POST,
    post
  }
}

// thunk creator (NOTE: this is a NAMED export! So deconstruct it!)
export const fetchSinglePost = postId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/posts/${postId}`)
      dispatch(getSinglePost(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// LIKE a post thunk creator
export const likedPost = postId => {
  return async function(dispatch) {
    try {
      let res = await axios.put(`/api/posts/${postId}/likes`)
      dispatch(likedPost(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

// DISLIKE a post thunk creator
export const dislikedPost = postId => {
  return async function(dispatch) {
    try {
      let res = await axios.put(`/api/post/${postId}/dislikes`)
      dispatch(dislikedPost(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

// initial state:
const initialState = {}

// create our reducer here:
export default function singlePostReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_POST:
      return action.post
    default:
      return state
  }
}
