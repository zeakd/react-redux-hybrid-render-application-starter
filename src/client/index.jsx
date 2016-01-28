import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import reducers from '../reducers';
import routes from '../routes';

render(
    <Router history={browserHistory}>{routes}</Router>
, document.getElementById("root"))