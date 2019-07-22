import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from '../config/fbConfig';

export const middlewares = [
  thunk.withExtraArgument({ getFirebase, getFirestore })
];

export const appliedMiddleware = applyMiddleware(...middlewares);

const store = createStore(
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

export default store;
