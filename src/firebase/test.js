import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore
  .collection('users')
  .doc('oSJlNxl3iIfxfJVuvgBG')
  .collection('cartItems')
  .doc('QUdFI4E918jDGLP13RqG');
