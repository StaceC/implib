import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import {
  Header,
  MainSection
} from '../todos';

import { Todo } from '../todos/model'

export interface IProps extends RouteComponentProps<any> {
  todos: Todo[];
  addTodo: (text:string)=>void;
  clearCompleted: ()=>void;
  completeAll: ()=>void;
  editTodo: (todo:Todo, text:string)=>void;
  completeTodo: (todo:Todo)=>void;
  deleteTodo: (todo:Todo)=>void;
};

export class Importer extends React.Component<IProps> {
  render() {
    const { todos, addTodo, clearCompleted, completeAll, editTodo, completeTodo, deleteTodo } = this.props;

    return (
      <div className="todoapp">
        <Header addTodo={(text: string) => addTodo(text)} />
        <MainSection
            todos={todos}
            editTodo={(t,s) => editTodo(t, s)}
            deleteTodo={(t: Todo) => deleteTodo(t)}
            completeTodo={(t: Todo) => completeTodo(t)}
            clearCompleted={() => clearCompleted()}
            completeAll={() => completeAll()}/>
      </div>
    );
  }
}

export default Importer;
