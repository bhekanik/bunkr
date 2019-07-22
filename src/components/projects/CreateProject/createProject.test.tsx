import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, testStore } from '../../../testUtils/utils';
import CreateProject from './CreateProject';

const setup = (props = {}) => {
  const store = testStore();
  const wrapper = shallow(<CreateProject {...props} store={store} />).dive();
  return wrapper;
};

describe('Create Project Component', () => {
  let wrapper;

  describe('When not signed in', () => {
    beforeEach(() => {
      const props = {
        auth: {},
        createProject: () => {},
        history: {}
      };
      wrapper = setup(props);
      console.log(wrapper.debug());
    });

    it('Should redirect to signin', () => {
      const component = findByTestAtrr(wrapper, 'redirect');
      expect(component.length).toBe(1);
    });
  });

  describe('When signed in', () => {
    beforeEach(() => {
      const props = {
        auth: { uid: 'xxx' },
        createProject: () => {},
        history: {}
      };
      wrapper = setup(props);
      console.log(wrapper.debug());
    });

    it('Should render without errors', () => {
      const component = findByTestAtrr(wrapper, 'createProject');
      expect(component.length).toBe(0);
    });
  });
});
