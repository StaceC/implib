import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Upload } from '../../upload';
import { Stage, StagedTrack } from '../../stage';
import { Library, Track } from '../../library';


let styles = require('./Prototype.scss');

export interface PrototypeProps extends RouteComponentProps<any> {
  // Upload Props
  stageTracks: (files: File[]) => any;
  // Stage Props
  clearCompleted: ()=>void;
  importStagedTracks: (stagedTracks: StagedTrack[])=>void;
  stagedTracks: StagedTrack[];
  // Library Props
  tracks: Track[];
  getTracks: ()=>void;
}

export class Prototype extends React.Component<PrototypeProps> {

  render() {
    const {
      stageTracks,
      clearCompleted,
      importStagedTracks,
      stagedTracks,
      tracks,
      getTracks,
    } = this.props;

    return (
      <div className={styles.prototype}>
        <div>
          <img src="./dist/Sharknado.png" width="25%"/>
        </div>
        <div className={styles.column}>
          <Upload
            stageTracks={(files: File[]) => stageTracks(files)}
          />
        </div>
        <div className={styles.column}>
          <Stage
            clearCompleted={() => clearCompleted()}
            importStagedTracks={() => importStagedTracks(stagedTracks)}
            stagedTracks={stagedTracks}
          />
        </div>
        <div className={[styles.column, styles.library].join(' ')}>
          <Library
            tracks={tracks}
            getTracks={getTracks}
          />
        </div>
      </div>
    );
  }
}

export default Prototype;
