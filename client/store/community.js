import axios from 'axios'

const GET_COMMUNITY = 'GET_COMMUNITY'

const getCommunity = data => ({type: GET_COMMUNITY, data: data})

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
  isSubscribed: false
}

export default function communityReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMUNITY:
      return action.data
    default:
      return state
  }
}
