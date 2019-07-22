import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import { findByTestAtrr } from '../../../testUtils/utils';

const setup = (props = {}) => {
  const component = shallow(<Home {...props} />);
  return component;
};

describe('Home Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAtrr(component, 'home');
    expect(wrapper.length).toBe(1);
  });
});
