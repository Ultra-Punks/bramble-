/* eslint-disable no-case-declarations */
import axios from 'axios'

// action types:
const GET_FOLLOWING_POSTS = 'GET_FOLLOWING_POSTS'
const UPDATE_POST = 'UPDATE_POST'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const DELETE_POST = 'DELETE_POST'
const DELETE_COMMENT = 'DELETE_COMMENT'

// action creator:
const getFollowingPosts = posts => ({type: GET_FOLLOWING_POSTS, posts})

const updateUserPost = post => ({type: UPDATE_POST, post})

const updateComment = (comment, postId) => ({
  type: UPDATE_COMMENT,
  comment,
  postId
})

const deletePost = postId => ({type: DELETE_POST, postId})

const deleteComment = (commentId, postId) => ({
  type: DELETE_COMMENT,
  commentId,
  postId
})

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

export const likeUserPostThunk = postId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/posts/${postId}/likes`)
      dispatch(updateUserPost(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeLikeUserPostThunk = postId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/posts/${postId}/likes/remove`)
      dispatch(updateUserPost(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const dislikeUserPostThunk = postId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/posts/${postId}/dislikes`)
      dispatch(updateUserPost(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const likeCommentThunk = (commentId, postId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/comments/${commentId}/likes`)
      dispatch(updateComment(data, postId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const unlikeCommentThunk = (commentId, postId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/comments/${commentId}/likes/remove`)
      dispatch(updateComment(data, postId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const dislikeCommentThunk = (commentId, postId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/comments/${commentId}/dislikes`)
      dispatch(updateComment(data, postId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deletePostThunk = postId => {
  return async dispatch => {
    await axios.delete(`/api/posts/${postId}`)
    dispatch(deletePost(postId))
  }
}

export const deleteCommentThunk = (commentId, postId) => {
  return async dispatch => {
    await axios.delete(`/api/comments/${commentId}`)
    dispatch(deleteComment(commentId, postId))
  }
}

// initial state:
const initialState = []

// create our reducer here:
export default function followingPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWING_POSTS:
      return [...action.posts]
    case UPDATE_POST:
      let liked = state.map(post => {
        if (post.id === action.post.id) {
          return action.post
        } else {
          return post
        }
      })
      return liked
    case UPDATE_COMMENT:
      let focusedPost
      let postComments
      state.map(post => {
        if (post.id === action.postId) {
          focusedPost = post
          postComments = post.postComments.map(comment => {
            if (comment.id === action.comment.id) {
              return action.comment
            } else {
              return comment
            }
          })
          return post
        } else {
          return post
        }
      })

      const newPost = {...focusedPost, postComments}

      let updatedPost = state.map(post => {
        if (post.id === action.postId) {
          return newPost
        } else {
          return post
        }
      })
      return updatedPost
    case DELETE_POST:
      let deletedPosts = state.filter(post => {
        return post.id !== action.postId
      })
      return deletedPosts
    case DELETE_COMMENT:
      let filteredPost
      let filteredComments
      state.map(post => {
        if (post.id === action.postId) {
          filteredPost = post
          filteredComments = post.postComments.filter(comment => {
            return comment.id !== action.commentId
          })
          return post
        } else {
          return post
        }
      })

      const deletedComPost = {
        ...filteredPost,
        postComments: [...filteredComments]
      }

      let newComPosts = state.map(post => {
        if (post.id === action.postId) {
          return deletedComPost
        } else {
          return post
        }
      })
      return newComPosts
    default:
      return state
  }
}
