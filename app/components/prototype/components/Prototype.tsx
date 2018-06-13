import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Stage } from '../../Stage';
import { Upload } from '../../Upload';

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
      <div className="todoapp">        
        <div>
          <Upload
            stageTracks={(files: File[]) => stageTracks(files)}
          />
        </div>
        <div>
          <Stage
            clearCompleted={() => clearCompleted()}
            importTracks={() => importTracks()}
          />
        </div>
      </div>
    );
  }
}

export default Prototype;
