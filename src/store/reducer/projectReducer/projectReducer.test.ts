import projectReducer, { initState } from './projectReducer';

describe('Project Reducer', () => {
  it('Should return default state', () => {
    const newState = projectReducer(undefined, {});
    expect(newState).toEqual(initState);
  });

  it('Should return new state if receiving type', () => {
    const project = initState.projects[0];
    const newState = projectReducer(undefined, {
      type: 'CREATE_PROJECT',
      project
    });
    expect(newState).toEqual(initState);
  });
});
