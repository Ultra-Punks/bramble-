import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

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

const updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */

export const fetchUser = username => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/${username}`)
      dispatch(getUser(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const updateUserThunk = (username, info) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${username}`, info)
    dispatch(updateUser(data))
    history.push(`/u/${username}`)
  } catch (error) {
    console.error(error)
  }
}

export const auth = (
  email,
  password,
  method,
  name,
  username
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      name,
      username
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push(`/home`)
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
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
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
