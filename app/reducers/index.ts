import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import todosState from '../components/todos';
import { IState as TodosState } from '../components/todos/model';
import { default as staged } from '../components/upload';
import { StagedState } from '../components/stage';

const rootReducer = combineReducers({
  todosState,
  counter,
  staged,
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
  todosState: TodosState;
  staged: StagedState;
}

export default rootReducer;
