import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'redux-simple-router';
import { browserHistory } from 'react-router';
import reducers from '../../reducers';
import DevTools from '../containers/Devtools';

const reduxRouterMiddleware = syncHistory(browserHistory);

var finalCreateStore;
if (process.env.NODE_ENV === 'development') {
    finalCreateStore = compose(
        applyMiddleware(reduxRouterMiddleware),
        DevTools.instrument()
    )(createStore);
} else {
    finalCreateStore = compose(
        applyMiddleware(reduxRouterMiddleware)
    )(createStore);
}

// const finalCreateStore = applyMiddleware(middleware)(createStore);
export default function (initialState) {
    const store = finalCreateStore(reducers, initialState);
    reduxRouterMiddleware.listenForReplays(store);
    return store;
}