const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUserRecord = functions.auth.user().onCreate((user) => {
  const { email, uid } = user;
  const db = admin.firestore();
  db.collection("users").doc(uid).set({
    email,
    userID: uid,
  });
});

exports.setupAdmin = functions.https.onCall((data, context) => {
  const { code, uid } = data;
  if (code === "admin") {
    return admin.auth().setCustomUserClaims(uid, { admin: true });
  }
});
