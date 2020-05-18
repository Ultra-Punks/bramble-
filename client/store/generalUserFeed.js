import axios from 'axios'

// action types:
const GET_FOLLOWING_POSTS = 'GET_FOLLOWING_POSTS'

// action creator:
const getFollowingPosts = posts => ({type: GET_FOLLOWING_POSTS, posts})

// thunk creator (NOTE: this is a NAMED export! So deconstruct it!)
export const fetchFollowingPosts = username => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/posts/from/${username}/following`)
      dispatch(getFollowingPosts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// initial state:
const initialState = []

// create our reducer here:
export default function followingPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWING_POSTS:
      return [...action.posts]
    default:
      return state
  }
}
