import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';

const rootReducer = combineReducers({
    routing
});

export default rootReducer;