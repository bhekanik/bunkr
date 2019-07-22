import { testStore } from '../testUtils/utils';
import { signIn } from '../store/actions/authActions/authActions';
import { initState } from '../store/reducer/projectReducer/projectReducer';
import { createProgram } from '../store/actions/programActions';

describe('Auth Actions', () => {
  beforeEach(() => {});

  test('Store is updated correctly', () => {
    const expectedState = initState;
    const store = testStore();

    return store
      .dispatch(
        // @ts-ignore
        createProgram({
          name: '',
          provider: '',
          partners: []
        })
      )
      .then(() => {
        const newState = store.getState();
        expect(newState.project.projects).toBe(initState);
      });
  });
});
