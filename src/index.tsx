import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import postStore from './stores/postStore';

useStrict(true);

ReactDOM.render(
  <Provider postStore={postStore} >
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);