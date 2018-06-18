import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { default as staged } from '../components/upload';
import { StagedState } from '../components/stage';
import { default as library, LibraryState } from '../components/library';

const rootReducer = combineReducers({
  staged,
  library,
  routing: routing as Reducer<any>
});

export interface IState {
  staged: StagedState;
  library: LibraryState;
}

export default rootReducer;
