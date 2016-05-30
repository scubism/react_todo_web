import { createRequestTypes } from '../../common/api'

export const LIST_TODOS = createRequestTypes('LIST_TODOS');
export const MOVE_TODO = createRequestTypes('MOVE_TODO');
export const VIEW_TODO = createRequestTypes('VIEW_TODO');
export const CREATE_TODO = createRequestTypes('CREATE_TODO');
export const UPDATE_TODO = createRequestTypes('UPDATE_TODO');
export const DELETE_TODO = createRequestTypes('DELETE_TODO');
