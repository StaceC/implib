import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Stage, StageProps, StageActions } from '../components/stage';
import { IState } from '../reducers';

function mapStateToProps(state: IState): Partial<StageProps> {

  return {};

}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<StageProps> {
  return bindActionCreators(StageActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Stage) as any as React.StatelessComponent<StageProps>);
