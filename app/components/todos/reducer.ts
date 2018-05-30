import { handleActions, handleAction, Action } from 'redux-actions';
const uuidv4 = require('uuid/v4');


import { Todo, Todos, IState } from './model';
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

const initialState: IState = {
  todos: [{
    text: 'Use Redux with TypeScript',
    completed: false,
    id: uuidv4()
  }],
  isFetching: true
};

export default handleActions<IState, Todo | Todos>({
  [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
    const newId = uuidv4();
    const todos = state.todos;

    return {...state, todos: [...todos, {
      id: newId.toString(),
      completed: ((action && action.payload && action.payload.completed) || false),
      text: ((action && action.payload && action.payload.text) || "")
    }]};
  },

  [DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
    return {...state, todos: state.todos.filter(todo =>
      todo.id !== ((action && action.payload && action.payload.id) || "")
    )};
  },

  [EDIT_TODO]: (state: IState, action: Action<Todo>): IState => {
    return <IState>{...state, todos: state.todos.map(todo =>
      todo.id === ((action && action.payload && action.payload.id) || "")
        ? { ...todo, text: ((action && action.payload && action.payload.text) || "") }
        : todo
    )};
  },

  [COMPLETE_TODO]: (state: IState, action: Action<Todo>): IState => {
    return <IState>{...state, todos: state.todos.map(todo =>
      todo.id === ((action && action.payload && action.payload.id) || "") ?
        { ...todo, completed: !todo.completed } :
        todo
    )};
  },

  [COMPLETE_ALL]: (state: IState, action: Action<Todo>): IState => {
    const areAllMarked = state.todos.every(todo => todo.completed);
    return <IState>{...state, todos: state.todos.map(todo => ({ ...todo,
      completed: !areAllMarked
    }))};
  },

  [CLEAR_COMPLETED]: (state: IState, action: Action<Todo>): IState => {
    return {...state, todos: state.todos.filter(todo => todo.completed === false)};
  },

  // GETTING TRACKS
  [GET_TODOS_REQUEST]: (state: IState, action: Action<Todo>): IState =>
    ({...state, isFetching: true}),
  [GET_TODOS_SUCCESS]: (state: IState, action: Action<Todos>): IState => {
    return {todos: (action && action.payload && action.payload) || [], isFetching: false};
  },
  [GET_TODOS_FAILURE]: (state: IState, action: Action<Todo>): IState => {
    return {...state, isFetching: true};
  },

  // IMPORTING TRACKS
  [IMPORT_TRACKS_REQUEST]: (state: IState, action: Action<Todos>): IState => {
    return state;
  },
  [IMPORT_TRACKS_SUCCESS]: (state: IState, action: Action<Todos>): IState => {
    return state;
  },
  [IMPORT_TRACKS_FAILURE]: (state: IState, action: Action<Todos>): IState => {
    return state;
  },

  // IMPORTING SINGLE TRACK
  [IMPORT_TRACKS_REQUEST]: (state: IState, action: Action<Todo>): IState => {
    return state;
  },
  [IMPORT_TRACKS_SUCCESS]: (state: IState, action: Action<Todo>): IState => {
    return state;
  },
  [IMPORT_TRACKS_FAILURE]: (state: IState, action: Action<Todo>): IState => {
    return state;
  },

}, initialState);


// TODO: Breakout the todos: Todo[] from the more specific Todo above.
// i.e. Remove the optional type `| IState` in the handleActions method above.
export const todosFetcher = handleAction<IState, IState>(
  GET_TODOS_SUCCESS, (state: IState, action: Action<IState>): IState => {
    return state;
  }, initialState
)
