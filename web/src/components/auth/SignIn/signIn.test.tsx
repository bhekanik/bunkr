import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './SignIn';
import { findByTestAtrr, testStore } from '../../../testUtils/utils';

const setup = (initialState = {}) => {
  const store = testStore();
  const props = {
    authError: '',
    auth: {},
    signIn: () => {}
  };
  const wrapper = shallow(<SignIn {...props} store={store} />).dive();
  return wrapper;
};

describe('SignIn Component', () => {
  describe('Component Renders', () => {
    let wrapper;
    beforeEach(() => {
      const initState = {
        authError: null
      };
      wrapper = setup(initState);
    });

    it('Should render without errors', () => {
      const component = findByTestAtrr(wrapper, 'signin');
      expect(component.length).toBe(1);
    });
  });
});
