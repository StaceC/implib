
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import {
  Header,
  MainSection
} from './todos';

import { Todo, Todos } from './todos/model';

import { Link } from 'react-router-dom';

let styles = require('./Counter.scss');

export interface IProps extends RouteComponentProps<any> {
  todos: Todo[];
  isFetching: boolean;
  addTodo: (text:string)=>void;
  clearCompleted: ()=>void;
  completeAll: ()=>void;
  editTodo: (todo:Todo, text:string)=>void;
  completeTodo: (todo:Todo)=>void;
  deleteTodo: (todo:Todo)=>void;
  getTodos: ()=>void;
  importTracks: (todos: Todos)=>void;
  importTrack: (todo: Todo)=>void;
  importFiles: (files: File[])=>void;
};

export class Importer extends React.Component<IProps> {

  renderLoading() {
    return (
      <div className="todoapp">
        Loading...
      </div>
    );
  }

  renderMain() {
    const { todos,
            isFetching,
            addTodo,
            clearCompleted,
            completeAll,
            editTodo,
            completeTodo,
            deleteTodo,
            importTracks,
            importTrack,
            importFiles } = this.props;

    return (
      <div className="todoapp">
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <Header
          addTodo={(text: string) => addTodo(text)}
          importFiles={(files: File[]) => importFiles(files)} />
        <MainSection
            todos={todos}
            isFetching={isFetching}
            editTodo={(t,s) => editTodo(t, s)}
            deleteTodo={(t: Todo) => deleteTodo(t)}
            completeTodo={(t: Todo) => completeTodo(t)}
            clearCompleted={() => clearCompleted()}
            completeAll={() => completeAll()}
            importTracks={(ts: Todos) => importTracks(ts)}
            importTrack={(t: Todo) => importTrack(t)}/>
      </div>
    );
  }

  render() {
    if(this.props.isFetching) {
      return this.renderLoading();
    } else {
      return this.renderMain();
    }
  }

  componentDidMount() {
    this.props.getTodos();
  }
}

export default Importer;
