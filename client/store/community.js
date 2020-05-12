import axios from 'axios'

const GET_COMMUNITY = 'GET_COMMUNITY'

const getCommunity = data => ({type: GET_COMMUNITY, data: data})

const initialState = []

export const fetchCommunity = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/community`)
      dispatch(getCommunity(res.data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

export const fetchOneCommunity = name => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/community/${name}`)
      dispatch(getCommunity(res.data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

export default function communityReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMUNITY: {
      return action.data
    }
    default:
      return state
  }
}
