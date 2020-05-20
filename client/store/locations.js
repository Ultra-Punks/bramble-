import axios from 'axios'

// action types
const GET_ALL_LOCATIONS = 'GET_ALL_LOCATIONS'
const GET_SOME_LOCATIONS = 'GET_SOME_LOCATIONS'
const ADD_LOCATION = 'ADD_LOCATION'
const GET_HOME_FEED_LOCATIONS = 'GET_HOME_FEED_LOCATIONS'

// action creators
const getAllLocations = locations => ({type: GET_ALL_LOCATIONS, locations})
const getSomeLocations = locations => ({type: GET_SOME_LOCATIONS, locations})
const getHomeFeedLocations = locations => ({
  type: GET_HOME_FEED_LOCATIONS,
  locations
})
const addLocation = location => ({type: ADD_LOCATION, location})

// thunk creators
export const fetchAllLocations = () => async dispatch => {
  try {
    const res = await axios.get('/api/locations')
    // console.log('res in thunk', res)
    dispatch(getAllLocations(res.data))
  } catch (err) {
    console.error(err, 'Error fetching all locations')
  }
}
export const fetchSomeLocations = (id, type) => async dispatch => {
  try {
    let res
    if (type === 'community') res = await axios.get(`/api/locations/of/${id}`)
    else if (type === 'user') res = await axios.get(`/api/locations/from/${id}`)
    else if (type === 'homeFeed')
      res = await axios.get(`/api/locations/home/${id}`)
    if (!res.data) fetchAllLocations()
    else dispatch(getSomeLocations(res.data))
  } catch (err) {
    console.error(err, 'Error fetching some locations')
  }
}

export const fetchHomeFeedLocations = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/locations/home/${userId}`)
    if (!res.data) return
    else dispatch(getHomeFeedLocations(res.data))
  } catch (err) {
    console.error(err, 'Error fetching home feed locations')
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
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_LOCATIONS:
      return action.locations
    case GET_SOME_LOCATIONS:
      return action.locations
    case ADD_LOCATION:
      return [...state, action.location]
    case GET_HOME_FEED_LOCATIONS:
      return action.locations
    default:
      return state
  }
}
