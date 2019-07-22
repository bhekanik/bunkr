import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import projectReducer from './projectReducer/projectReducer';
import programReducer from './programReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  program: programReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
