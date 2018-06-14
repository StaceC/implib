import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { StageActions } from '../components/stage';
import { UploadActions } from '../components/upload';
import { Prototype, PrototypeProps } from '../components/prototype';
import { IState } from '../reducers';

function mapStateToProps(state: IState): Partial<PrototypeProps> {
  return {
    stagedTracks: state.stagedState.stagedTracks
  };
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<PrototypeProps> {
  return bindActionCreators({...StageActions, ...UploadActions} as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Prototype) as any as React.StatelessComponent<PrototypeProps>);
