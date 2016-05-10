import { combineReducers } from 'redux';
import todoReducer from '../pages/todo/reducers';

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer(asyncReducers) {
  return combineReducers({
    todoReducer,
    ...asyncReducers,
  });
}
