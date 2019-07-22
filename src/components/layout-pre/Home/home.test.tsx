import Home from './Home';
import {
  findByTestAtrr,
  setupComponentWithStore
} from '../../../testUtils/utils';

describe('Home Component', () => {
  let component;
  beforeEach(() => {
    component = setupComponentWithStore(Home);
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAtrr(component, 'home');
    expect(wrapper.length).toBe(1);
  });
});
