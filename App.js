/**
 * Created by kai on 28/02/2018.
 */
import React from 'react'
import AppContainer from './src/AppContainer'
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk';
import reducer from './src/reducers'
import initialState from "./src/reducers/initialState";
import {Root} from "native-base";

console.disableYellowBox = true;
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

export const store = configureStore(initialState);

export default () => (
  <Root>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </Root>
);
