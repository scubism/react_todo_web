import {
  LIST_TODOS
} from './actions';

export default function todoReducer(state = {
  todos: [],
}, action) {
  switch (action.type) {
    case LIST_TODOS:
      return  Object.assign({}, state, {todos: [{title: "xxx"}, {title: "yyy"}, {title: "zzz"}]});
  }

  return state;
}
