import * as React from 'react';

import TodoTextInput from './TodoTextInput';
import Dropzone from 'react-dropzone';

//var fs = require('fs');
//const path = require('path');
//const uuidv4 = require('uuid/v4');

export interface HeaderProps {
  addTodo: (text:string)=> any;
  importFiles: (files: File[]) => any;
};

class Header extends React.Component<HeaderProps> {
  handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  onDrop(tracks: File[]) {
    tracks.forEach( track => {
      //fs.createReadStream((track as any).path).pipe(fs.createWriteStream('tracks' + path.sep + uuidv4() + '.zip'));
      this.props.importFiles(tracks);
      //this.handleSave(track.name);
    })
  }

  render() {
    return (
      <header className="header">
          <h1>todos</h1>
          <TodoTextInput
            newTodo
            onSave={this.handleSave.bind(this)}
            placeholder="What needs to be done?" />

          <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>

      </header>
    );
  }
}

export default Header;
