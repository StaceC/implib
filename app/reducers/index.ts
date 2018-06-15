import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter, { TState as TCounterState } from './counter';
import todosState from '../components/todos';
import { IState as TodosState } from '../components/todos/model';
import { default as staged } from '../components/upload';
import { StagedState } from '../components/stage';
import { default as library, LibraryState } from '../components/library';

const rootReducer = combineReducers({
  todosState,
  counter,
  staged,
  library,
  routing: routing as Reducer<any>
});

export interface IState {
  counter: TCounterState;
  todosState: TodosState;
  staged: StagedState;
  library: LibraryState;
}

export default rootReducer;
