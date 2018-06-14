import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import todosState from '../components/todos';
import { IState as TodosState } from '../components/todos/model';
import { default as stagedState } from '../components/upload';
import { StagedState } from '../components/stage';

const rootReducer = combineReducers({
  todosState,
  counter,
  stagedState,
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
  todosState: TodosState;
  stagedState: StagedState;
}

export default rootReducer;
