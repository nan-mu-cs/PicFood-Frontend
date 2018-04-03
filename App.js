/**
 * Created by kai on 28/02/2018.
 */
import React from 'react'
import {AppRegistry, AsyncStorage} from 'react-native'
import AppContainer from './src/AppContainer'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk';
import {NativeRouter, Route, Switch} from 'react-router-native'

// import createLogger from 'redux-logger'
import reducer from './src/reducers'
import initialState from "./src/reducers/initialState";
import {Root} from "native-base";

// middleware that logs actions
// const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

console.disableYellowBox = true;
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      // loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

export const store = configureStore(initialState);

export default () => (
  <Root>
    <Provider store={store}>
      <NativeRouter>
        <AppContainer/>
      </NativeRouter>
    </Provider>
  </Root>
);

// AppRegistry.registerComponent('PicFood', () => App);