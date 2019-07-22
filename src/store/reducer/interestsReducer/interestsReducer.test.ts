import interestsReducer, { initState } from './interestsReducer';

describe('Interests Reducer', () => {
  it('Should return default state', () => {
    const newState = interestsReducer(undefined, {});
    expect(newState).toEqual(initState);
  });

  it('Should return new state if receiving type', () => {
    const interest = initState.interests[0];
    const newState = interestsReducer(undefined, {
      type: 'CREATE_INTEREST',
      interest
    });
    expect(newState).toEqual(initState);
  });
});
