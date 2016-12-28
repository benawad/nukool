import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import homeUpdate from './home';

const rootReducer = combineReducers({
  homeState: homeUpdate,
  routing: routerReducer
});

export default rootReducer;
