import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA-J9I7XweFpC6SjFsGSRKM5RCMP-NhLfU',
  authDomain: 'bunkr-app-staging.firebaseapp.com',
  databaseURL: 'https://bunkr-app-staging.firebaseio.com',
  projectId: 'bunkr-app-staging',
  storageBucket: 'bunkr-app-staging.appspot.com',
  messagingSenderId: '685260440051',
  appId: '1:685260440051:web:44ce3de2beaed99e'
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
