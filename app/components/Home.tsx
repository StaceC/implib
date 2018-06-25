import * as React from 'react';
import { Link } from 'react-router-dom';

let styles = require('./Home.scss');

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Filmstro</h2>
          <h3>Import Library</h3>
          <span data-tid="prototype_link"><Link to="/prototype">Prototype</Link></span>
        </div>
      </div>
    );
  }
}
