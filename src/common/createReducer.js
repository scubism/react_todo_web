import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'
import todoReducer from '../modules/todo/reducers';

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer(asyncReducers) {
  return combineReducers({
    todoReducer,
    ...asyncReducers,
    form: formReducer,
  });
}
