import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Root from './Root';
import 'antd/dist/antd.css';
import './index.css';
import 'react-quill/dist/quill.snow.css';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector('#root')
);
