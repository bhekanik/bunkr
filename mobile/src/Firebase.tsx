import * as firebase from 'firebase';

const firebaseConfig = {};

export type User = {
  email: string;
  password: string;
};

export default class Firebase {
  static auth: any;
  static registrationInfo = {
    displayName: '',
    email: ''
  };

  static init() {
    firebase.initializeApp(firebaseConfig);
    Firebase.auth = firebase.auth();
  }

  static async signUp(user: User): Promise<firebase.auth.UserCredential> {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      console.log('Signup successful:', userCredential);
      return userCredential;
    } catch (error) {
      console.log('Signup failed:', error);
      return error;
    }
  }

  static async signIn(user: User): Promise<firebase.auth.UserCredential> {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);
      console.log(userCredential);
      return userCredential;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider);

    try {
      const result = await firebase.auth().getRedirectResult();
      if (result.credential) {
        const credential = result.credential;
      }
      var user = result.user;
      return {
        user,
        credential
      };
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      return {
        errorCode,
        errorMessage,
        emailUsed: email,
        credential
      };
    }
  }

  static isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  static onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!Firebase.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(() => {
              console.log('user signed in');
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      });
  }

  static async signOut() {
    try {
      await firebase.auth().signOut();
      return null;
    } catch (error) {
      return error;
    }
  }
}
