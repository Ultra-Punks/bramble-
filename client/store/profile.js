// will need to import axios...
import axios from 'axios'

// action types go here:
const GOT_USERS = 'GOT_USERS'

// action creators go here:
const gotUsers = users => {
  return {
    type: GOT_USERS,
    users
  }
}

// thunk creators below (remember, this returns an async function!)
export const fetchUsers = () => {
  return async dispatch => {
    try {
      // get all the artists
      const res = await axios.get('/api/users')
      dispatch(gotUsers(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

// initial state:
const initialState = []

// reducer here:
export default function profile(state = initialState, action) {
  switch (action.type) {
    case GOT_USERS:
      return [...action.users]
    default:
      return state
  }
}
