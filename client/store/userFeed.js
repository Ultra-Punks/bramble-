import axios from 'axios'

// action types:
const GET_USER_POSTS = 'GET_USER_POSTS'
const ADD_USER_POST = 'ADD_USER_POST'
const GET_COMMUNITY_POSTS = 'GET_COMMUNITY_POSTS'

// action creator:
const getUserPosts = posts => ({type: GET_USER_POSTS, posts})

const addUserPost = post => ({type: ADD_USER_POST, post})

const getCommunityPosts = posts => ({type: GET_COMMUNITY_POSTS, posts})

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
      dispatch(getCommunityPosts(data.userPosts))
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
      dispatch(addUserPost(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// initial state:
const initialState = {
  profilePosts: [],
  communityPosts: []
}

// create our reducer here:
export default function singleUserPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_POSTS:
      return {...state, profilePosts: action.posts}
    case ADD_USER_POST:
      return {...state, profilePosts: [action.post, ...state.profilePosts]}
    case GET_COMMUNITY_POSTS:
      return {...state, communityPosts: action.posts}
    default:
      return state
  }
}
