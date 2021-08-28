import { Provider } from 'react-redux';

import store from './store.js';

const Root = props => <Provider store={store}>{props.children}</Provider>;
export default Root;
