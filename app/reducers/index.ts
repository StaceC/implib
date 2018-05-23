import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import todosState from '../components/todos';
import { IState as TodosState } from '../components/todos/model';

const rootReducer = combineReducers({
  todosState,
  counter,
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
  todosState: TodosState;
}

export default rootReducer;
