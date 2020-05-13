import axios from 'axios'

const GET_ALL_USER_PHOTOS = 'GET_ALL_USER_PHOTOS'

const getAllUserPhotos = photos => ({type: GET_ALL_USER_PHOTOS, photos})

const initialState = []

export const fetchAllPhotos = username => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/photos/${username}`)
      dispatch(getAllUserPhotos(data))
    } catch (error) {
      console.log('error', error)
    }
  }
}

export default function allPhotos(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USER_PHOTOS: {
      return [...action.photos]
    }
    default:
      return state
  }
}
