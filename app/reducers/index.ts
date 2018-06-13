import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import todosState from '../components/todos';
import { IState as TodosState } from '../components/todos/model';
import { UploadReducer } from '../components/Upload';
import { StagedState } from '../components/Stage';

const rootReducer = combineReducers({
  todosState,
  counter,
  UploadReducer,
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
  todosState: TodosState;
  stagedState: StagedState;
}

export default rootReducer;
