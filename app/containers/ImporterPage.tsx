import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Importer, IProps } from '../components/Importer';
import * as ImporterActions from '../components/todos/actions';
import { IState } from '../reducers';
//import { IState as TodoState } from '../components/todos/model';


function mapStateToProps(state: IState): Partial<IProps> {

  return {
    todos: state.todosState.todos,
    isFetching: state.todosState.isFetching
  };

}



function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<IProps> {
  return bindActionCreators(ImporterActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Importer) as any as React.StatelessComponent<IProps>);
