import { combineReducers } from 'redux'
import todosReducer from './todosReducer'

const rootReducer = combineReducers({
  todosReducer,
});

export default rootReducer;
