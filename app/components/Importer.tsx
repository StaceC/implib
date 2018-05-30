import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import {
  Header,
  MainSection
} from './todos';

import { Todo, Todos } from './todos/model'

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
    const { todos, isFetching, addTodo, clearCompleted, completeAll, editTodo, completeTodo, deleteTodo, importTracks, importTrack } = this.props;

    return (
      <div className="todoapp">
        <Header addTodo={(text: string) => addTodo(text)} />
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
