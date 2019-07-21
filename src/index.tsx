import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { history, store } from './configStore/configStore';
import registerServiceWorker from '../registerServiceWorker';

import App from './App';

ReactDOM.render((
    <Provider store={ store }>
      <App history={ history } />
    </Provider>
  ),
  document.getElementById('index'),
);

registerServiceWorker();
