import axios from 'axios'

// action types
const GET_ALL_LOCATIONS = 'GET_ALL_LOCATIONS'

// action creators
const getAllLocations = locations => ({type: GET_ALL_LOCATIONS, locations})

// thunk creators
export const fetchAllLocations = () => async dispatch => {
  try {
    const res = await axios.get('/api/locations')
    dispatch(getAllLocations(res.data))
  } catch (err) {
    console.error(err, 'Error fetching all locations')
  }
}

// reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_LOCATIONS:
      return action.locations
    default:
      return state
  }
}
