import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import App from '../App';
import Root from '../Root';

describe('the component should route to all public pages', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render header component and home', () => {
    wrapper = mount(
      <Root>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Root>
    );

    expect(wrapper.find('Home').length).toEqual(1);
    expect(wrapper.find('Header').length).toEqual(1);
  });

  it('should render header component and shop', () => {
    wrapper = mount(
      <Root>
        <MemoryRouter initialEntries={['/shop']}>
          <App />
        </MemoryRouter>
      </Root>
    );

    expect(wrapper.find('Header').length).toEqual(1);
    expect(wrapper.find('Shop').length).toEqual(1);
  });

  it('should render header component and login page', () => {
    wrapper = mount(
      <Root>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Root>
    );

    expect(wrapper.find('Header').length).toEqual(1);
    expect(wrapper.find('Login').length).toEqual(1);
  });

  it('should render header component and register page', () => {
    wrapper = mount(
      <Root>
        <MemoryRouter initialEntries={['/register']}>
          <App />
        </MemoryRouter>
      </Root>
    );

    expect(wrapper.find('Header').length).toEqual(1);
    expect(wrapper.find('Register').length).toEqual(1);
  });
});
