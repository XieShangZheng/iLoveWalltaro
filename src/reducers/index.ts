import { combineReducers } from 'redux'
import user from './user'
import post from './post'
import users from './users'

export default combineReducers({
  user,
  post,
  users,
})
