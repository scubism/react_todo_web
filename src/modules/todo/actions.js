import { createAction } from 'redux-actions'

export const listTodos = createAction('LIST_TODOS');
export const createTodo = createAction('CREATE_TODO');
export const updateTodo = createAction('UPDATE_TODO');
export const deleteTodo = createAction('DELETE_TODO');

export const focusTodo = createAction('FOCUS_TODO');
export const viewTodo = createAction('VIEW_TODO');
export const moveTodo = createAction('MOVE_TODO', (targetTodo, stagedTodos) => {
  let priorSiblingId = "";
  for (let i=0; i<stagedTodos.length; i++) {
    if (stagedTodos[i].id == targetTodo.id) {
      break;
    }
    priorSiblingId = stagedTodos[i].id;
  }
  return {
    id: targetTodo.id,
    data: {prior_sibling_id: priorSiblingId},
    stagedTodos: stagedTodos,
  }
});
