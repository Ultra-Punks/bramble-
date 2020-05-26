/* eslint-disable no-case-declarations */
import axios from 'axios'

// action types:
const GET_ALL_POSTS = 'GET_ALL_POSTS'
const GET_SINGLE_POST = 'GET_SINGLE_POST'
const ADD_COMMENT = 'ADD_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const DELETE_COMMENT_SINGLE = 'DELETE_COMMENT_SINGLE'

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

const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment
})

const deleteCommentSingle = commentId => ({
  type: DELETE_COMMENT_SINGLE,
  commentId
})

const addComment = comment => ({type: ADD_COMMENT, comment})

// thunk creator (NOTE: this is a NAMED export! So deconstruct it!)
export const fetchAllPosts = () => {
  return async dispatch => {
    const res = await axios.get('api/posts')
    dispatch(getAllPosts(res.data))
  }
}

export const likeComment = commentId => {
  return async dispatch => {
    const {data} = await axios.put(`/api/comments/${commentId}/likes`)
    dispatch(updateComment(data))
  }
}

export const unlikeComment = commentId => {
  return async dispatch => {
    const {data} = await axios.put(`/api/comments/${commentId}/likes/remove`)
    dispatch(updateComment(data))
  }
}

export const dislikeComment = commentId => {
  return async dispatch => {
    const {data} = await axios.put(`/api/comments/${commentId}/dislikes`)
    dispatch(updateComment(data))
  }
}

export const undislikeComment = commentId => {
  return async dispatch => {
    const {data} = await axios.put(`/api/comments/${commentId}/dislikes/remove`)
    dispatch(updateComment(data))
  }
}

export const deleteCommentSingleThunk = commentId => {
  return async dispatch => {
    await axios.delete(`/api/comments/${commentId}`)
    dispatch(deleteCommentSingle(commentId))
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

export const deleteTagThunk = tagId => {
  return async () => {
    try {
      await axios.delete(`/api/tags/${tagId}`)
    } catch (error) {
      console.error(error)
    }
  }
}

// LIKE a post thunk creator
export const likedPost = postId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.put(`/api/posts/${postId}/likes`)
      dispatch(getSinglePost(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// LIKE a post thunk creator
export const unlikedPost = postId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.put(`/api/posts/${postId}/likes/remove`)
      dispatch(getSinglePost(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// DISLIKE a post thunk creator
export const dislikedPost = postId => {
  return async function(dispatch) {
    try {
      let {data} = await axios.put(`/api/posts/${postId}/dislikes`)
      dispatch(getSinglePost(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const undislikedPost = postId => {
  return async function(dispatch) {
    try {
      let {data} = await axios.put(`/api/posts/${postId}/dislikes/remove`)
      dispatch(getSinglePost(data))
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
      dispatch(addComment(data))
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
    case GET_ALL_POSTS:
      return action.posts
    case GET_SINGLE_POST:
      return action.post
    case ADD_COMMENT:
      return {...state, postComments: [...state.postComments, action.comment]}
    case UPDATE_COMMENT:
      const updated = state.postComments.map(comment => {
        if (comment.id === action.comment.id) {
          return action.comment
        } else {
          return comment
        }
      })
      return {...state, postComments: updated}

    case DELETE_COMMENT_SINGLE:
      const removed = state.postComments.filter(comment => {
        return comment.id !== action.commentId
      })
      return {...state, postComments: removed}
    default:
      return state
  }
}
