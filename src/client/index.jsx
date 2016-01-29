import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { browserHistory } from 'react-router';
import reducers from '../reducers';
import routes from '../routes';
import Root from './containers/Root';
import initStore from './helpers/init-store';

const initialState = window.__INITIAL_STATE__;
const store = initStore(initialState);

render(
    <Root history={browserHistory} store={store}>{routes}</Root>
, document.getElementById("root"))