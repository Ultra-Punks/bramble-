import axios from 'axios'

const GET_ALL_PHOTOS = 'GET_ALL_USER_PHOTOS'

const getAllPhotos = photos => ({type: GET_ALL_PHOTOS, photos})

const initialState = []

export const fetchAllPhotos = username => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/photos/from/${username}`)
      dispatch(getAllPhotos(data))
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const fetchAllCommunityPhotos = communityId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/photos/from/community/${communityId}`
      )
      dispatch(getAllPhotos(data))
    } catch (error) {
      console.log('error', error)
    }
  }
}

export default function allPhotos(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PHOTOS: {
      return [...action.photos]
    }
    default:
      return state
  }
}
