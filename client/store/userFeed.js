import axios from 'axios'

// action types:
const GET_USER_POSTS = 'GET_USER_POSTS'

// action creator:
const getUserPosts = posts => {
  return {
    type: GET_USER_POSTS,
    posts
  }
}

// thunk creator (NOTE: this is a NAMED export! So deconstruct it!)
export const fetchUserPosts = username => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/posts/from/${username}`)
      dispatch(getUserPosts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// initial state:
const initialState = []

// create our reducer here:
export default function singleUserPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_POSTS:
      return [...action.posts]
    default:
      return state
  }
}
