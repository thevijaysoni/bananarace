import {createStore} from 'redux';
import rootReducer from './reducers';

function configureStore() {
  const store = createStore(rootReducer);
  return store;
}

export const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
