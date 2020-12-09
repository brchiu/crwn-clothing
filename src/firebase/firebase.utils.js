import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// const config = {
//   //apiKey: 'AIzaSyAfP214m1V2G0XSpdvvO9exwN1vbuf1njg',
//   apiKey: 'AIzaSyCdHT-AYHXjF7wOrfAchX4PIm3cSj5tn14',
//   authDomain: 'crwn-db.firebaseapp.com',
//   databaseURL: 'https://crwn-db.firebaseio.com',
//   projectId: 'crwn-db',
//   storageBucket: 'crwn-db.appspot.com',
//   //messagingSenderId: '469172431766',
//   //appId: '1:469172431766:web:bd104d1c0ac3bbd9',
//   messagingSenderId: '850995411664',
//   appId: '1:850995411664:web:7ddc01d597846f65',
// };

var config = {
  apiKey: 'AIzaSyDDXjVECV1c2o0kjeB_lpjdVq_boRjVQKw',
  authDomain: 'crwn-db-6f52b.firebaseapp.com',
  projectId: 'crwn-db-6f52b',
  storageBucket: 'crwn-db-6f52b.appspot.com',
  messagingSenderId: '556552918358',
  appId: '1:556552918358:web:79a28bb8624d1bcbb732f7',
  measurementId: 'G-KSJY6DDXSB',
};
// Initialize Firebase
firebase.initializeApp(config);
// firebase.analytics();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
