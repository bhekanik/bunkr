import Navbar from './Navbar';
import {
  findByTestAtrr,
  setupComponentWithStore
} from '../../../testUtils/utils';

describe('Navbar Component', () => {
  let component;
  beforeEach(() => {
    component = setupComponentWithStore(Navbar);
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAtrr(component, 'navbar');
    expect(wrapper.length).toBe(1);
  });
});
