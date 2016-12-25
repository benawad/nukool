import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import addResults from './finishMessage';

const rootReducer = combineReducers({
  messageSuccess: addResults,
  routing: routerReducer
});

export default rootReducer;
