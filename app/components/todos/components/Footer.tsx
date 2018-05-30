import * as React from 'react';
import * as classNames from 'classnames';

import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};


interface FooterProps {
  completedCount: number;
  activeCount: number;
  filter: string;
  onClearCompleted: ()=>void;
  onImportTracks: ()=>void;
  onShow: (filter:string)=>void;
}

class Footer extends React.Component<FooterProps> {
  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: string) {
    const title: string = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <a className={classNames({ selected: filter === selectedFilter })}
         style={{ cursor: 'pointer' }}
         onClick={() => onShow(filter)}>
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;

    return (
      <button className="clear-completed"
              onClick={() => onClearCompleted()}
              disabled={completedCount <= 0} >
        Clear completed
      </button>
    );

  }

  renderImportButton() {

    const { completedCount, onImportTracks } = this.props;

    return (
      <button className="clear-completed"
              onClick={() => onImportTracks()}
              disabled={completedCount > 0} >
        Import Tracks
      </button>
    );

  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
        {this.renderImportButton()}
      </footer>
    );
  }
}

export default Footer;
