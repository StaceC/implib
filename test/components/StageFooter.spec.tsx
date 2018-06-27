import '../utils/enzymeConfig';
import { spy } from 'sinon';
import * as React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../app/components/Stage';
import {} from 'jest';

const StageFooterAny = Footer as any;

function setup() {

  const actions = {
    onImportTracks: spy(),
    onClearTracks: spy(),
  };

  const component = shallow(<StageFooterAny {...actions} />);
  return {
    component,
    actions,
    buttons: component.find('button')
  };
}

describe('Stage component Footer', () => {

  it('first button should call clear completed imports', () => {
    const { buttons, actions } = setup();
    buttons.at(0).simulate('click');
    expect(actions.onClearTracks.called).toBe(true);
  });

  it('second button should call import', () => {
    const { buttons, actions } = setup();
    buttons.at(1).simulate('click');
    expect(actions.onImportTracks.called).toBe(true);
  });

});
