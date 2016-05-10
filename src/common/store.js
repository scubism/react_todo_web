import { createStore, applyMiddleware, combineReducers } from 'redux';
import todoReducer from '../pages/todo/reducers';



export function configureStore(initialState = {}) {
  const rootReducer = combineReducers({
    todoReducer,
  });

  const store = createStore(rootReducer, initialState);

  return store;
}
