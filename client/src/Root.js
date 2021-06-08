import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store.js';

export default props => {
  return <Provider store={store}>{props.children}</Provider>;
};
