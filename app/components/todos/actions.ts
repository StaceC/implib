import { createAction } from 'redux-actions';

import { Todo } from './model';

import db from "../../db/models";

import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE
} from './constants/ActionTypes';

const addTodo = createAction<Todo, string>(
  ADD_TODO,
  (text: string) => ({ id: "", text, completed: false })
);

const deleteTodo = createAction<Todo, Todo>(
  DELETE_TODO,
  (todo: Todo) => todo
);

const editTodo = createAction<Todo, Todo, string>(
  EDIT_TODO,
  (todo: Todo, newText: string) => ({ ...todo, text: newText })
);

const completeTodo = createAction<Todo, Todo>(
  COMPLETE_TODO,
  (todo: Todo) => todo
);

const completeAll = createAction<void>(
  COMPLETE_ALL,
  () => { }
);

const clearCompleted = createAction<void>(
  CLEAR_COMPLETED,
  () => { }
);

export function getTodos() {
  return (dispatch: Function) => {
    dispatch({ type: GET_TODOS_REQUEST });
    return db.Todo.findAll()
      .then((todos) => dispatch( { type: GET_TODOS_SUCCESS, payload: todos} ))
      .catch((error: any) => dispatch( { type: GET_TODOS_FAILURE, payload: null}))
  }
}

export {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAll,
  clearCompleted
}
