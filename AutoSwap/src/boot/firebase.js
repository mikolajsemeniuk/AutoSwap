import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBlG8EgCA_F697D_ihQ5kGGsssK7xDPBgs",
  authDomain: "autoswap-f2cec.firebaseapp.com",
  databaseURL: "https://autoswap-f2cec.firebaseio.com",
  projectId: "autoswap-f2cec",
  storageBucket: "autoswap-f2cec.appspot.com",
  messagingSenderId: "998100011881",
  appId: "1:998100011881:web:24fb43de15030d86"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebaseApp.auth()
const db = firebaseApp.firestore()
const storage = firebaseApp.storage()

export { firebase, auth, db, storage }

