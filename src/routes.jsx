import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Blog from './containers/Blog';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/blog" component={Blog} />  
    </Route>
);