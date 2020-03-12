import { firebase, auth, db } from 'boot/firebase'
import { LocalStorage, Loading } from 'quasar'
import md5 from "md5"

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser:(state, payload) => state.user = payload
}

export const actions = {
  registerUser({ commit }, payload) {
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        const avatar = `https://gravatar.com/avatar/${md5(payload.email)}?d=identicon`
        const user = {
          uid: res.user.uid,
          username: payload.username,
          email: payload.email,
          photo: avatar,
          role: 'person',
          telephone: '',
          description: ''
        }
        db.collection('users').doc(payload.email).set(user)
        commit('main/setMessage', 'You were succefully registered', { root: true })
        setTimeout(() => this.$router.push('/'), 3000)
      })
      .catch(e => {
        commit('main/setMessage', e.message, { root: true })
      })
  },
  loginUser({ commit }, payload) {
    auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('main/setMessage', 'You were succefully loggedIn', { root: true })
        setTimeout(() => this.$router.push('/'), 3000)
      })
      .catch(e => {
        commit('main/setMessage', e.message, { root: true })
      })
  },
  // async loginUserWithGmail({ commit }) {
  //   const provider = new firebase.auth.GoogleAuthProvider()
  //   firebase.auth().languageCode = 'en'
  //   const result = await auth.signInWithPopup(provider)
  //   const user = result.user
  //   user.providerData.forEach(function (profile) {
  //     console.log("Sign-in provider: " + profile.providerId);
  //     console.log("  Provider-specific UID: " + profile.uid);
  //     console.log("  Name: " + profile.displayName);
  //     console.log("  Email: " + profile.email);
  //     console.log("  Photo URL: " + profile.photoURL);
  //   })  
  // },
  async logoutUser({ commit }) {
    await auth.signOut()
    commit('main/setMessage', 'You were succefully loggedOut', { root: true })
    commit('main/setMode', 0, { root: true })
  },
  handleAuthStateChange({ commit }) {
    auth.onAuthStateChanged(user => {
      if (user) { // user
        let userRef = db.collection('users').doc(auth.currentUser.email)
        userRef.get()
          .then(doc => {
            if (doc.exists) {
              LocalStorage.set('user', doc.data())
              commit('setUser', doc.data())
            }
          })
          .catch(e => {
            console.log('Error getting document', e);
          })
      } else { // no user
        LocalStorage.set('user', '')
        commit('setUser', '')
      }
    })
  }
}

export const getters = {
  user: state => state.user
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}