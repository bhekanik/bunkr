import React from 'react';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../store/reducer/rootReducer';
import { middlewares } from '../store/store';
import { reduxFirestore } from 'redux-firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import fbConfig from '../config/fbConfig';
import { shallow } from 'enzyme';

export const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const testStore = () => {
  const appliedMiddleware = applyMiddleware(...middlewares);
  return createStore(
    rootReducer,
    compose(
      appliedMiddleware,
      reduxFirestore(fbConfig),
      reactReduxFirebase(fbConfig, {
        userProfile: 'users',
        useFirestoreForProfile: true,
        attachAuthIsReady: true
      })
    )
  );
};

export const setupComponentWithStore = (Component, props = {}) => {
  const store = testStore();
  const wrapper = shallow(<Component {...props} store={store} />).dive();
  return wrapper;
};

export const setupComponent = (Component, props = {}) => {
  const component = shallow(<Component {...props} />);
  return component;
};
