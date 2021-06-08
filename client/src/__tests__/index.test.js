import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import App from '../App';
import Root from '../Root';

it('should render App component', () => {
  const wrapper = mount(
    <Root>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Root>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
