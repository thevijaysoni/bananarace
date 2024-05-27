import {combineReducers} from 'redux';
import searchReducer from './searchReducer';

const appReducer = combineReducers({
  searchReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
