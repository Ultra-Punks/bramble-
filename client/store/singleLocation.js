import axios from 'axios'
import {mapboxToken} from '../../secrets'
// action types
const GET_ADDRESS = 'GET_ADDRESS'
const ADD_LOCATION = 'ADD_LOCATION'

// action creators
const getAddress = address => ({type: GET_ADDRESS, address})
const addLocation = location => ({type: ADD_LOCATION, location})

// thunk creators
// fetchAddress doesn't do anything yet
export const fetchAddress = () => async dispatch => {
  try {
    // const res = await axios.get('/api/')
    // dispatch(getAddress(res.data))
  } catch (err) {
    console.error(err, 'Error fetching address!')
  }
}
export const addLocationThunk = location => async dispatch => {
  try {
    const res = await axios.post('/api/locations/add', location)
    dispatch(addLocation(res.data))
  } catch (err) {
    console.error(err, 'Error adding location')
  }
}

// reducer
export default function(state = {}, action) {
  switch (action.type) {
    case GET_ADDRESS:
      return {...state, address: action.address}
    case ADD_LOCATION:
      return action.location
    default:
      return state
  }
}
