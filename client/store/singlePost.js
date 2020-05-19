import axios from 'axios'

// action types:
const GET_ALL_POSTS = 'GET_ALL_POSTS'
const GET_SINGLE_POST = 'GET_SINGLE_POST'

// action creator:
const getAllPosts = posts => {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

const getSinglePost = post => {
  return {
    type: GET_SINGLE_POST,
    post
  }
}

// thunk creator (NOTE: this is a NAMED export! So deconstruct it!)
export const fetchAllPosts = () => {
  return async dispatch => {
    const res = await axios.get('api/posts')
    dispatch(getAllPosts(res.data))
  }
}

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

export const fetchRandomPosts = ids => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/posts/random`, {
        postIds: ids
      })
      dispatch(getAllPosts(data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

// initial state:
const initialState = {}

// create our reducer here:
export default function singlePostReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.posts
    case GET_SINGLE_POST:
      return action.post
    default:
      return state
  }
}
