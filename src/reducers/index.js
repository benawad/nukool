import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import messageSuccess from './finishMessage';

const rootReducer = combineReducers({
  messageSuccess,
  routing: routerReducer
});

export default rootReducer;
