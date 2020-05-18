import axios from 'axios'
import {useHistory} from 'react-router-dom'

// action types:
const CHECK_IF_FOLLOWING = 'CHECK_IF_FOLLOWING'

// action creator:
const checkFollowing = trueOrFalse => {
  return {
    type: CHECK_IF_FOLLOWING,
    trueOrFalse
  }
}

export const checkIfFollowing = info => {
  const {loggedInUser, username} = info

  return async dispatch => {
    try {
      const {data} = await axios.post(
        `/api/users/${loggedInUser}/follow/check`,
        {username: username}
      )
      dispatch(checkFollowing(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// initial state:
const initialState = false

// create our reducer here:
export default function checkFollowingReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_IF_FOLLOWING:
      return action.trueOrFalse
    default:
      return state
  }
}
