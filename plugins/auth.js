
// plugin auth
import { auth } from '~/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function ({ store }) {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      store.commit('auth/SET_USER', user)
      unsubscribe()
      resolve()
    })

    // Ensure resolution even if Firebase auth is slow or fails
    setTimeout(() => {
      unsubscribe()
      resolve()
    }, 10000) 
  })
}



