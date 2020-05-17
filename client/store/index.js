import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import food from './food'
import locations from './locations'

import community from './community'
import profiles from './allProfiles'
import singleProfile from './singleProfile'
import allPhotos from './photos'
import userPosts from './userFeed'
import singlePost from './singlePost'
import postComments from './postComments'
import singleComment from './singleComment'

const reducer = combineReducers({
  user,
  food,
  profiles,
  singleProfile,
  community,
  allPhotos,
  singlePost,
  userPosts,
  locations,
  postComments,
  singleComment
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
