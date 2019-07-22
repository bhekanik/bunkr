export const admin = require("firebase-admin");
import serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bunkr-app-staging.firebaseio.com"
});

export const db = admin.firestore();
