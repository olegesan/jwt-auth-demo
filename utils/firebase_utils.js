import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const db = firebase.firestore(firebase.apps[0]);

export const getCollectionData = (name) => {
  return db.collection(name).get();
  // .then((querySnapshot) => {
  //   const data = [];
  //   querySnapshot.forEach((obj) => {
  //     data.push(obj.data());
  //   });
  //   console.log(data);
  //   return data;
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

export const getStreamedCollectionData = (name, observer) => {
  return db.collection(name).onSnapshot(observer);
};

export const writeData = (collection, name, data) => {
  return db.collection(collection).doc(name).set(data);
};

export const deleteData = (collection, name) => {
  const query = db.collection(collection).where("name", "==", name);
  return query.get().then((snapshot) => {
    snapshot.forEach((doc) => doc.ref.delete());
  });
};
