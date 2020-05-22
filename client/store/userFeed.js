/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

// action types:
const GET_USER_POSTS = 'GET_USER_POSTS'
const UPDATE_USER_POST = 'UPDATE_USER_POST'
const UPDATE_USER_COMMENT = 'UPDATE_USER_COMMENT'
const ADD_USER_POST = 'ADD_USER_POST'
const DELETE_USER_POST = 'DELETE_USER_POST'
const DELETE_USER_COMMENT = 'DELETE_USER_COMMENT'
const GET_COMMUNITY_POSTS = 'GET_COMMUNITY_POSTS'
const UPDATE_COMMUNITY_POST = 'UPDATE_COMMUNITY_POST'
const UPDATE_COMMUNITY_COMMENT = 'UPDATE_COMMUNITY_COMMENT'
const DELETE_COMMUNITY_POST = 'DELETE_COMMUNITY_POST'
const DELETE_COMMUNITY_COMMENT = 'DELETE_COMMUNITY_COMMENT'

// action creator:
const getUserPosts = posts => ({type: GET_USER_POSTS, posts})

const updateUserPost = post => ({type: UPDATE_USER_POST, post})

const updateUserComment = (comment, postId) => ({
  type: UPDATE_USER_COMMENT,
  comment,
  postId
})

const addUserPost = post => ({type: ADD_USER_POST, post})

const deleteUserPost = postId => ({type: DELETE_USER_POST, postId})

const deleteUserComment = (commentId, postId) => ({
  type: DELETE_USER_COMMENT,
  commentId,
  postId
})

const getCommunityPosts = posts => ({type: GET_COMMUNITY_POSTS, posts})

const updateCommunityPost = post => ({type: UPDATE_COMMUNITY_POST, post})

const updateCommunityComment = (comment, postId) => ({
  type: UPDATE_COMMUNITY_COMMENT,
  comment,
  postId
})

const deleteCommunityPost = postId => ({type: DELETE_COMMUNITY_POST, postId})

const deleteCommunityComment = (commentId, postId) => ({
  type: DELETE_COMMUNITY_COMMENT,
  commentId,
  postId
})

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

export const likePostThunk = postId => {
  return async dispatch => {
    const {data} = await axios.put(`/api/posts/${postId}/likes`)
    dispatch(updateUserPost(data))
  }
}

export const dislikePostThunk = postId => {
  return async dispatch => {
    const {data} = await axios.put(`/api/posts/${postId}/dislikes`)
    dispatch(updateUserPost(data))
  }
}

export const likeProfileCommentThunk = (commentId, postId) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/comments/${commentId}/likes`)
    dispatch(updateUserComment(data, postId))
  }
}

export const dislikeProfileCommentThunk = (commentId, postId) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/comments/${commentId}/dislikes`)
    dispatch(updateUserComment(data, postId))
  }
}

// thunk to fetch User community Post
export const fetchCommunityPosts = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/posts/for/${id}`)
      dispatch(getCommunityPosts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const likeCommunityPost = postId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/posts/${postId}/likes`)
      dispatch(updateCommunityPost(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const dislikeCommunityPost = postId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/posts/${postId}/dislikes`)
      dispatch(updateCommunityPost(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const likeCommunityCommentThunk = (commentId, postId) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/comments/${commentId}/likes`)
    dispatch(updateCommunityComment(data, postId))
  }
}

export const dislikeCommunityCommentThunk = (commentId, postId) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/comments/${commentId}/dislikes`)
    dispatch(updateCommunityComment(data, postId))
  }
}

export const addPostThunk = postInfo => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `/api/posts/add/${postInfo.username}`,
        postInfo
      )
      history.push(`/p/${data.id}`)
      dispatch(addUserPost(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deletePostThunk = postId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/posts/${postId}`)
      dispatch(deleteUserPost(postId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteCommentThunk = (commentId, postId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/comments/${commentId}`)
      dispatch(deleteUserComment(commentId, postId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteCommunityPostThunk = postId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/posts/${postId}`)
      dispatch(deleteCommunityPost(postId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteCommunityCommentThunk = (commentId, postId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/comments/${commentId}`)
      dispatch(deleteCommunityComment(commentId, postId))
    } catch (error) {
      console.error(error)
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
    case DELETE_USER_POST:
      let deleted = state.profilePosts.filter(post => {
        return post.id !== action.postId
      })
      return {...state, profilePosts: deleted}
    case DELETE_USER_COMMENT:
      let statePosts
      let postCom
      state.profilePosts.map(post => {
        if (post.id === action.postId) {
          statePosts = post
          postCom = post.postComments.filter(comment => {
            return comment.id !== action.commentId
          })
          return post
        } else {
          return post
        }
      })

      const deletedPost = {...statePosts, postComments: [...postCom]}

      let newPosts = state.profilePosts.map(post => {
        if (post.id === action.postId) {
          return deletedPost
        } else {
          return post
        }
      })
      return {...state, profilePosts: newPosts}
    case UPDATE_USER_POST:
      let liked = state.profilePosts.map(post => {
        if (post.id === action.post.id) {
          return action.post
        } else {
          return post
        }
      })
      return {...state, profilePosts: liked}
    case UPDATE_USER_COMMENT:
      let focusedPost
      let postComments
      state.profilePosts.map(post => {
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

      let updatedPost = state.profilePosts.map(post => {
        if (post.id === action.postId) {
          return newPost
        } else {
          return post
        }
      })
      return {...state, profilePosts: updatedPost}
    case GET_COMMUNITY_POSTS:
      return {...state, communityPosts: action.posts}
    case DELETE_COMMUNITY_POST:
      let deletedCom = state.communityPosts.filter(post => {
        return post.id !== action.postId
      })
      return {...state, communityPosts: deletedCom}
    case DELETE_COMMUNITY_COMMENT:
      let stateComPosts
      let statePostCom
      state.communityPosts.map(post => {
        if (post.id === action.postId) {
          stateComPosts = post
          statePostCom = post.postComments.filter(comment => {
            return comment.id !== action.commentId
          })
          return post
        } else {
          return post
        }
      })

      const deletedComPost = {...stateComPosts, postComments: [...statePostCom]}

      let newComPosts = state.communityPosts.map(post => {
        if (post.id === action.postId) {
          return deletedComPost
        } else {
          return post
        }
      })
      return {...state, communityPosts: newComPosts}
    case UPDATE_COMMUNITY_POST:
      let likedCom = state.communityPosts.map(comPost => {
        if (comPost.id === action.post.id) {
          return action.post
        } else {
          return comPost
        }
      })
      return {...state, communityPosts: likedCom}
    case UPDATE_COMMUNITY_COMMENT:
      let comFocused
      let comPostComments
      state.communityPosts.map(post => {
        if (post.id === action.postId) {
          comFocused = post
          comPostComments = post.postComments.map(comment => {
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

      const updated = {...comFocused, postComments: [...comPostComments]}

      let comPosts = state.communityPosts.map(post => {
        if (post.id === action.postId) {
          return updated
        } else {
          return post
        }
      })
      return {...state, communityPosts: comPosts}
    default:
      return state
  }
}
