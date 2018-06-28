import { spy } from 'sinon';
import {} from 'jest';
import * as actions  from '../../app/actions/staging';
import { testZipFilesArray } from '../resources';

describe('Stage actions', () => {
  it('should bring an array of files into the staging area', () => {
    const fn = actions.stageTracks(testZipFilesArray);
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    expect(dispatch.calledWith({ type: actions.stageTrack(testZipFilesArray[0]).type }));
    expect(dispatch.calledWith({ type: actions.stageTracksSuccess().type }));
    expect(dispatch.getCalls().length === 6).toBe(true);
  });

  it('should bring an individual file into the stating area', () => {
    expect(actions.stageTrack(testZipFilesArray[0]).type).toMatchSnapshot();
  });

});
