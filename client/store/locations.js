import axios from 'axios'
import history from '../history'

// action types
const GET_ALL_LOCATIONS = 'GET_ALL_LOCATIONS'
const GET_SOME_LOCATIONS = 'GET_SOME_LOCATIONS'
const ADD_LOCATION = 'ADD_LOCATION'

// action creators
const getAllLocations = locations => ({type: GET_ALL_LOCATIONS, locations})
const getSomeLocations = locations => ({type: GET_SOME_LOCATIONS, locations})
const addLocation = location => ({type: ADD_LOCATION, location})

// thunk creators
export const fetchAllLocations = () => async dispatch => {
  try {
    const res = await axios.get('/api/locations')
    dispatch(getAllLocations(res.data))
  } catch (err) {
    console.error(err, 'Error fetching all locations')
  }
}
export const fetchSomeLocations = (id, type) => async dispatch => {
  try {
    // console.log('type of fetch in some', type)
    let res
    if (type === 'community') res = await axios.get(`/api/locations/of/${id}`)
    else if (type === 'user') res = await axios.get(`/api/locations/from/${id}`)
    else if (type === 'homeFeed') res = await axios.get(`/api/locations/home`)
    if (!res.data || !res.data[0]) {
      // res = await axios.get('/api/locations')
      // dispatch(getAllLocations(res.data))
      // console.log('fetched All Locations instead of Some')
      dispatch(getSomeLocations([`No Locations related to this ${type}`]))
    } else dispatch(getSomeLocations(res.data))
  } catch (err) {
    console.error(err, 'Error fetching some locations')
  }
}

export const addLocationThunk = location => async dispatch => {
  try {
    const {data} = await axios.post('/api/locations/add', location)
    dispatch(addLocation(data))
    history.push(`/l/${data.id}`)
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
    default:
      return state
  }
}
