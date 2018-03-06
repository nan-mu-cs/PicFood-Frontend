/**
 * Created by kai on 28/02/2018.
 */
import React from 'react'
import { AppRegistry } from 'react-native'
import AppContainer from './src/AppContainer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
import reducer from './src/reducers'
import initialState from "./src/reducers/initialState";
// middleware that logs actions
// const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            // loggerMiddleware,
        ),
    );
    return createStore(reducer, initialState, enhancer);
}

const store = configureStore(initialState);

export default () => (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);

// AppRegistry.registerComponent('PicFood', () => App);