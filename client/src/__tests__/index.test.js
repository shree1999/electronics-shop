import { mount } from 'enzyme';

import App from '../App';
import Root from '../Root';

it('should render App component', () => {
  const wrapper = mount(
    <Root>
      <App />
    </Root>
  );

  expect(wrapper).toBeTruthy();
});
