import { createAction } from 'redux-actions';

import { Todo, Todos } from './model';

import db from "../../db/models";

//const uuidv4 = require('uuid/v4');

import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  IMPORT_TRACKS_REQUEST,
  IMPORT_TRACKS_SUCCESS,
  IMPORT_TRACKS_FAILURE
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

const getTodosSuccess = createAction<Todos, Todos>(
  GET_TODOS_SUCCESS,
  (todos: Todos) => todos
);

const getTodosFailure = createAction<void, Todo>(
  GET_TODOS_FAILURE,
  () => <Todo>{
          text: 'Use Redux with TypeScript',
          completed: false,
          id: "123"
        }
);

const importTracksSuccess = createAction<Todos, Todos>(
  IMPORT_TRACKS_SUCCESS,
  (todos: Todos) => todos
);

const importTracksFailure = createAction<void, Todo>(
  IMPORT_TRACKS_FAILURE,
  () => <Todo>{
          text: 'Failed to import tracks',
          completed: false,
          id: "123"
        }
);

export function importTracks(todos: Todos) {
  return (dispatch: Function) => {
    dispatch({ type: IMPORT_TRACKS_REQUEST });
    console.log("Importing Tracks ["+ todos + "]");
    dispatch(importTracksSuccess(todos));
  }
}


export function getTodos() {
  return (dispatch: Function) => {
    dispatch({ type: GET_TODOS_REQUEST });
    return db.Todo.findAll({ raw: true })
      .then((todos) => dispatch(
        getTodosSuccess(todos as Todo[])
      ))
      .catch((error: any) => dispatch( { type: GET_TODOS_FAILURE, payload: null}))
  }
}


export {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAll,
  clearCompleted,
  getTodosSuccess,
  getTodosFailure,
  importTracksSuccess,
  importTracksFailure
}
