import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import todos from '../todos';
import { Todo } from '../todos/model';

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
