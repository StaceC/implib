import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { LibraryActions } from '../actions';
import { StagingActions } from '../actions';
import { Prototype, PrototypeProps } from '../components/prototype';
import { IState } from '../reducers';

function mapStateToProps(state: IState): Partial<PrototypeProps> {
  return {
    stagedTracks: state.staged.tracks,
    tracks: state.library.tracks
  };
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<PrototypeProps> {
  return bindActionCreators({...LibraryActions, ...StagingActions} as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Prototype) as any as React.StatelessComponent<PrototypeProps>);
