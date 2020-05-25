import axios from 'axios'

const GET_COMMUNITY = 'GET_COMMUNITY'
const GET_COMMUNITY_LOCATIONS = 'GET_COMMUNITY_LOCATIONS'

const getCommunity = data => ({type: GET_COMMUNITY, data: data})

const getCommunityLocations = locations => ({
  type: GET_COMMUNITY_LOCATIONS,
  locations
})

export const fetchSingleCommunity = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/community/list/${id}`)
      dispatch(getCommunity(res.data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

export const fetchCommunityLocations = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/locations/of/${id}`)
      dispatch(getCommunityLocations(data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

export const subToCommunity = id => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/community/subscribe`, {communityId: id})
      dispatch(getCommunity(res.data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

export const unSubToCommunity = id => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/community/unsubscribe`, {
        communityId: id
      })
      dispatch(getCommunity(res.data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

const initialState = {
  communityProfile: {},
  locations: [],
  isSubscribed: false
}

export default function communityReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMUNITY:
      return {...state, ...action.data}
    case GET_COMMUNITY_LOCATIONS:
      return {...state, locations: action.locations}
    default:
      return state
  }
}
