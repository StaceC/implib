import { createAction } from 'redux-actions';
import { Todo, Todos, Track } from './model';
import db from "../../db/models";
import * as yauzl from "yauzl";
import { ZipFile, Entry} from "yauzl";

import fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const env = process.env.NODE_ENV || "development";
const appConfig = require(`${__dirname}/../../config/appConfig.json`)[env];

var SAVE_DIR  = "";

if (env == "production") {
  SAVE_DIR = path.join(
    require("electron").remote.app.getPath("appData"),
    //appConfig.appName,
    appConfig.tracksDirName);
} else {
  SAVE_DIR = path.join(appConfig.tracksDirName);
}

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
  IMPORT_TRACK_FAILURE,
  IMPORT_FILES,
  IMPORT_FILES_SUCCESS,
  IMPORT_FILES_FAILURE,
  IMPORT_FILE,
  IMPORT_FILE_SUCCESS,
  IMPORT_FILE_FAILURE
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

export function importFile(file: File) {
  return (dispatch: Function) => {
    dispatch({ type: IMPORT_FILE });
    unpackArchive(file)
    .then((track: Track) => {
      console.log("Track Name[" + track.name+ "]");
      const newId = uuidv4();
      db.Todo.build( {id: newId.toString(), text: track.name, completed: true} )
      .save()
      .then(savedTrack => {
        console.log(savedTrack);
        dispatch(importFileSuccess(savedTrack.get({plain: true}) as Todo))
      })
      .catch(error => {
        console.log(error);
        dispatch(importFileFailure({id: newId.toString(), text: track.name, completed: false}));
      });
    });
  }
}
const importFileSuccess = createAction<Todo, Todo>(
  IMPORT_FILE_SUCCESS,
  (todo: Todo) => todo
);
const importFileFailure = createAction<void, Todo>(
  IMPORT_FILE_FAILURE,
  () => <Todo>{
          text: 'Failed to import file',
          completed: false,
          id: "123"
        }
);


// IMPORTING INDIVIDUAL TRACKS
export function importFiles(files: File[]) {
  return (dispatch: Function) => {
    dispatch({ type: IMPORT_FILES });
    const dispatchedImportFiles = files.map( file => { return dispatch(importFile(file)) } );

    return Promise.all(dispatchedImportFiles)
    .then(() => {
      return dispatch(importFilesSuccess(files));
    });
  }
}
const importFilesSuccess = createAction<File[], File[]>(
  IMPORT_FILES_SUCCESS,
  (files: File[]) => files
);
const importFilesFailure = createAction<void, Todo>(
  IMPORT_FILES_FAILURE,
  () => <Todo>{
          text: 'Failed to import files',
          completed: false,
          id: "123"
        }
);

function unpackArchive(file: File): Promise<Track> {
  return new Promise(function (resolve,reject) {
    var track: Track = <Track>{};

    yauzl.open((file as any).path, {autoClose: true, lazyEntries: true}, function(err:any, zipfile: ZipFile) {
      if (err) throw err;
      zipfile.readEntry();
      zipfile.on("entry", function(entry: Entry) {
        if (/\/$/.test(entry.fileName)) {
          // Directory file names end with '/'.
          // Note that entires for directories themselves are optional.
          // An entry's fileName implicitly requires its parent directories to exist.
          console.log("Zip Directory: " + entry.fileName);
          const dirname = entry.fileName.replace(/\/$/, "");
          track.name = dirname;
          console.log("Dirname[" + dirname + "]");
          fs.mkdir(path.join(SAVE_DIR, dirname), function(e: any){
            if(!e || (e && e.code === 'EEXIST')){
              console.log("Created directory [" + dirname + "]");
              //do something with contents
            } else {
              //debug
              console.log("Unable to create directory [" + dirname + "]" + e);
            }
          });

        } else {
          // file entry
          zipfile.openReadStream(entry, function(err, readStream) {
            if (err) throw err;
            if(readStream) {
              readStream.on("end", function() {
                zipfile.readEntry();
              });
              console.log("Zip FileName: " + entry.fileName);
              //var filename = entry.fileName.replace(/^.*[\\\/]/, '')
              //console.log("Filename: [" + filename + "]");
              readStream.pipe(fs.createWriteStream(path.join(SAVE_DIR, entry.fileName)));
            }
          });
        }
        // Check if the zip file is still open and read the next entry
        if(zipfile.isOpen) {
          zipfile.readEntry();
        }

        resolve(track);
      });
    });
  })
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
  importTracksFailure,
  importTrackSuccess,
  importTrackFailure,
  importFilesSuccess,
  importFilesFailure,
  importFileSuccess,
  importFileFailure,
}
