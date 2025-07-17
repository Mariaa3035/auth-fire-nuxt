// fireas
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCucAv9Zd-VuYiocgyBJHJqbX3wMTAwIwI",
  authDomain: "authvue-1b7c1.firebaseapp.com",
  projectId: "authvue-1b7c1",
  storageBucket: "authvue-1b7c1.appspot.com",
  messagingSenderId: "178551451540",
  appId: "1:178551451540:web:dda15e9927cbc19c802981",
  measurementId: "G-B7WXEQ9WCX"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
