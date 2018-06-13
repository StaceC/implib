import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Upload } from '../../Upload';
import { Stage } from '../../Stage';
import { Library } from '../../Library';


let styles = require('./Prototype.scss');

export interface PrototypeProps extends RouteComponentProps<any> {
  // Upload Props
  stageTracks: (files: File[]) => any;
  // Stage Props
  clearCompleted: ()=>void;
  importTracks: ()=>void;
}

export class Prototype extends React.Component<PrototypeProps> {

  render() {
    const {
      stageTracks,
      clearCompleted,
      importTracks,
    } = this.props;

    return (
      <div className={styles.prototype}>
        <div className={styles.column}>
          <Upload
            stageTracks={(files: File[]) => stageTracks(files)}
          />
        </div>
        <div className={styles.column}>
          <Stage
            clearCompleted={() => clearCompleted()}
            importTracks={() => importTracks()}
          />
        </div>
        <div className={[styles.column, styles.library].join(' ')}>
          <Library />
        </div>
      </div>
    );
  }
}

export default Prototype;
