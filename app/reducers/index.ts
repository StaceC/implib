import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import todos from '../components/todos';
import { Todo } from '../components/todos/model';

const rootReducer = combineReducers({
  todos,
  counter,
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
  todos: Todo[];
}

export default rootReducer;
