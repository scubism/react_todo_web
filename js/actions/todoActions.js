export const LIST_TODOS = 'LIST_TODOS';
export const VIEW_TODO = 'VIEW_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export function listTodos(todos) {
  return {type: LIST_TODOS, todos: todos}
}

export function viewTodo(todo, viewing) {
  return {type: VIEW_TODO, todo: todo, viewing: viewing}
}

export function createTodo(todo) {
  return {type: CREATE_TODO, todo: todo}
}

export function updateTodo(todo, updating) {
  return {type: UPDATE_TODO, todo: todo, updating: updating}
}

export function deleteTodo(todo) {
  return {type: DELETE_TODO, todo: todo}
}
