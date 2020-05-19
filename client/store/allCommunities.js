import axios from 'axios'

const GET_ALL_COMMUNITIES = 'GET_ALL_COMMUNITIES'

const getCommunities = data => ({type: GET_ALL_COMMUNITIES, data: data})

export const fetchAllCommunities = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/community`)
      dispatch(getCommunities(data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

export const fetchOneCommunity = name => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/community/${name}`)
      dispatch(getCommunities(data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

export const fetchRandomCommunities = ids => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/community/random`, {
        communityIds: ids
      })
      dispatch(getCommunities(data))
    } catch (error) {
      console.log('Error ', error)
    }
  }
}

const initialState = []

export default function allCommunitiesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMUNITIES:
      return action.data
    default:
      return state
  }
}
