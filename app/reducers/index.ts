import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { StagedState } from '../components/stage';
import { LibraryState } from '../components/library';
import library from './libraryTracks';
import staged from './stagedTracks';

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
