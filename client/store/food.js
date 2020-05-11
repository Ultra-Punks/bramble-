import axios from 'axios'

const GET_RECIPE = 'GET_RECIPE'

const getRecipe = data => ({type: GET_RECIPE, data: data})

const initialState = []

export const fetchRecipe = query => {
  return async dispatch => {
    try {
      const searchUrl = `https://api.spoonacular.com/food/menuItems/search?query=${query}&number=2&apiKey=790dc5b49b474c409e068307c9773d08`
      const res = await axios.get(searchUrl)
      dispatch(getRecipe(res.data.menuItems))
    } catch (error) {
      console.log('error', error)
    }
  }
}

export default function foodReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE: {
      return action.data
    }
    default:
      return state
  }
}
