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
  IMPORT_TRACKS_FAILURE,
  IMPORT_TRACK_REQUEST,
  IMPORT_TRACK_SUCCESS,
  IMPORT_TRACK_FAILURE
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


// GET TRACKS - DROPZONE FILE GRABBER
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
const getTodosSuccess = createAction<Todos, Todos>(
  GET_TODOS_SUCCESS,
  (todos: Todos) => todos
);
const getTodosFailure = createAction<void, Todo>(
  GET_TODOS_FAILURE,
  () => {}
  /*
  () => <Todo>{
          text: 'Use Redux with TypeScript',
          completed: false,
          id: "123"
        }
      */
  );


// IMPORT A LIST OF TRACKS -> CALLS IMPORT TRACK
export function importTracks(todos: Todos) {
  return (dispatch: Function) => {
    dispatch({ type: IMPORT_TRACKS_REQUEST });

    const dispatchedTodos = todos.map( track => { return dispatch(importTrack(track)) } );

    return Promise.all(dispatchedTodos)
    .then(() => {
      return dispatch(importTracksSuccess(todos));
    });

  }
}
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


// IMPORTING INDIVIDUAL TRACKS
export function importTrack(todo: Todo) {
  return (dispatch: Function) => {
    dispatch({ type: IMPORT_TRACK_REQUEST });
    console.log("Importing Track ["+ todo + "]");
    db.Todo.build( {id: todo.id, text: todo.text, completed: true} )
    .save()
    .then(savedTrack => dispatch(importTrackSuccess(savedTrack as Todo)))
    .catch(error => {
      console.log(error);
      dispatch(importTrackFailure(todo));
    })
  }
}
const importTrackSuccess = createAction<Todo, Todo>(
  IMPORT_TRACK_SUCCESS,
  (todo: Todo) => todo
);
const importTrackFailure = createAction<void, Todo>(
  IMPORT_TRACK_FAILURE,
  () => <Todo>{
          text: 'Failed to import tracks',
          completed: false,
          id: "123"
        }
);


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
  importTracksFailure,
  importTrackSuccess,
  importTrackFailure
}
