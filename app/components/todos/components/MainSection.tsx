import * as React from 'react';

import { Todo } from '../model';
import TodoItem from './TodoItem';
import Footer from './Footer';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo: Todo) => !todo.completed,
  [SHOW_COMPLETED]: (todo: Todo) => todo.completed
};

export interface MainSectionProps {
  todos: Todo[];
  isFetching: boolean;
  clearCompleted: ()=>void;
  completeAll: ()=>void;
  editTodo: (todo:Todo, text:string)=>void;
  completeTodo: (todo:Todo)=>void;
  deleteTodo: (todo:Todo)=>void;
};

export interface MainSectionState {
  filter: string;
};

class MainSection extends React.Component<MainSectionProps, MainSectionState> {
  constructor(props: MainSectionProps, context: MainSectionState) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.clearCompleted();
    }
  }

  handleShow(filter: string) {
    this.setState({ filter });
  }

  renderToggleAll(completedCount: number) {
    const { todos, completeAll } = this.props;
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={() => completeAll()} />
      );
    } else {
      return (
        <div>Error - No Todos</div>
      );
    }
  }

  renderFooter(completedCount: number) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      );
    } else {
        return (
        <Footer completedCount={0}
              activeCount={0}
              filter={""}
              onClearCompleted={this.handleClearCompleted.bind(this)}
              onShow={this.handleShow.bind(this)} />
        );
    }
  }

  renderMain() {
    const { todos, completeTodo, deleteTodo, editTodo } = this.props;
    const { filter } = this.state;

    const filteredTodos: Todo[] = todos.filter(TODO_FILTERS[filter]);
    const completedCount: number = todos.reduce((count: number, todo: Todo): number =>
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              editTodo={editTodo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}/>
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }

  renderLoading() {
    return (
      <section className="main">
        Loading...
      </section>
    );
  }


  render() {
    const { isFetching } = this.props;
    if(isFetching) {
      return this.renderLoading();
    } else {
      return this.renderMain();
    }
  }
}

export default MainSection;
