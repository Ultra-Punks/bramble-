import axios from 'axios'
import {mapboxToken} from '../../secrets'
// action types
const GET_ONE_LOCATION = 'GET_ONE_LOCATION'
const GET_ADDRESS = 'GET_ADDRESS'
const ADD_LOCATION_REVIEW = 'ADD_LOCATION_REVIEW'

// action creators
const getOneLocation = location => ({type: GET_ONE_LOCATION, location})
const getAddress = address => ({type: GET_ADDRESS, address})
const addLocationReview = review => ({type: ADD_LOCATION_REVIEW, review})

// thunk creators
export const fetchOneLocation = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/locations/${id}`)
    dispatch(getOneLocation(data))
  } catch (err) {
    console.error(err, 'Error fetching location!')
  }
}

// fetchAddress doesn't do anything yet, but may get the address when the user drops a pin on the map
export const fetchAddress = coordinates => async dispatch => {
  const coords = coordinates.join(',')
  try {
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/coords.json?limit=1&access_token=${mapboxToken}`
    )
    // console.log('this is res from address', res.data)
    dispatch(getAddress(res.data))
  } catch (err) {
    console.error(err, 'Error fetching address!')
  }
}
export const addLocationReviewThunk = (id, review) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/reviews/of/${id}`, review)
    dispatch(addLocationReview(data))
  } catch (err) {
    console.error(err, 'Error adding location review')
  }
}

// reducer
export default function(state = {}, action) {
  switch (action.type) {
    case GET_ONE_LOCATION:
      return action.location
    case GET_ADDRESS:
      return {...state, address: action.address}
    case ADD_LOCATION_REVIEW:
      return {
        ...state,
        locationReviews: [...state.locationReviews, action.review]
      }
    default:
      return state
  }
}
