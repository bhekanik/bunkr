import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, testStore } from '../../../testUtils/utils';
import SignUp from './SignUp';

const setup = (initialState = {}) => {
  const store = testStore();
  const props = {
    authError: '',
    auth: {},
    signUn: () => {}
  };
  const wrapper = shallow(<SignUp {...props} store={store} />).dive();
  return wrapper;
};

describe('SignUp Component', () => {
  describe('Component Renders', () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const initState = {
        authError: null
      };
      wrapper = setup(initState);
    });

    it('Should render without errors', () => {
      const component = findByTestAtrr(wrapper, 'signup');
      expect(component.length).toBe(1);
    });

    it('should handleChange on click event', () => {
      const signUpBtn = findByTestAtrr(wrapper, 'signup-btn');
      signUpBtn.simulate('click');
      expect(signUpBtn.length).toBe(1);
    });
  });
});
