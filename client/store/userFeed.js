import axios from 'axios'

// action types:
const GET_USER_POSTS = 'GET_USER_POSTS'
const ADD_POST = 'ADD_POST'

// action creator:
const getUserPosts = posts => ({type: GET_USER_POSTS, posts})

const addPost = post => ({type: ADD_POST, post})

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


// thunk to fetch User community Post
export const fetchCommunityPosts = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/posts/for/${id}`)
      dispatch(getUserPosts(data.userPosts))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addPostThunk = postInfo => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `/api/posts/add/${postInfo.username}`,
        postInfo
      )
      dispatch(addPost(data))
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
    case ADD_POST:
      return [...state, action.post]
    default:
      return state
  }
}
