import axios from 'axios'
import {mapboxToken} from '../../secrets'
// action types
const GET_ADDRESS = 'GET_ADDRESS'

// action creators
const getAddress = address => ({type: GET_ADDRESS, address})

// thunk creators
export const fetchAddress = () => async dispatch => {
  try {
    const res = await axios.get('/api/locations')
    dispatch(getAddress(res.data))
  } catch (err) {
    console.error(err, 'Error fetching address!')
  }
}

// reducer
export default function(state = '', action) {
  switch (action.type) {
    case GET_ADDRESS:
      return action.address
    default:
      return state
  }
}
