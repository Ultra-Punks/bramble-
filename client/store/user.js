import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
// const GET_PROFILE = 'GET_PROFILE'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => {
  return {
    type: GET_USER,
    user
  }
}
const removeUser = () => ({type: REMOVE_USER})

// const getProfile = (profile) => {
//   return {
//     type: GET_PROFILE,
//     profile,
//   }
// }

/**
 * THUNK CREATORS
 */

export const fetchUser = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/${userId}`)
      dispatch(getUser(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

// export const fetchProfile = (userId) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.get(`api/users/${userId}`)
//       dispatch(getProfile(res.data))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    // case GET_PROFILE:
    //   return action.profile
    default:
      return state
  }
}
