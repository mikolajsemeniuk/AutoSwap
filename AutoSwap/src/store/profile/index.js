import { db, storage } from 'boot/firebase'

export const state = () => ({
  profile: ''
})

export const mutations = {
  setProfile(state, payload) {
    state.profile = payload
  },
  clearProfile(state) {
    state.profile = ''
  }
}

export const actions = {
  setProfile({ commit }, payload) {
    db.collection('users').doc(payload).get()
    .then(doc => {
      if (doc.exists) { commit('setProfile', doc.data()) }
    })
    .catch(e => {
      console.log(e) 
      commit('main/setMessage', 'unknown error occured pls check your connection and try again later', { root: true }) 
    })
  },
  async updateProfile({ commit }, payload) { // only if the uid is the same with email
    const imageRef = storage.ref().child(payload.email).child('profilePhoto')
    let urlDownloaded
    if (payload.image === null) {
      urlDownloaded = payload.photo
    } else {
      await imageRef.put(payload.image)
      urlDownloaded = await imageRef.getDownloadURL()
    }
    await db.collection('users').doc(payload.email).update({
      photo: urlDownloaded,
      description: payload.description,
      role: payload.role,
      telephone: payload.telephone,
      email: payload.email
    })
      .then(() => {
        let userRef = db.collection('users').doc(payload.email)
        userRef.get()
          .then(doc => {
            if (doc.exists) {
              localStorage.setItem('user', JSON.stringify(doc.data()))
              commit('auth/setUser', doc.data(), { root: true }) // JSON.parse(retrievedObject)
            }
          })
          .catch(e => {
            commit('main/setMessage', e.message, { root: true })
          })
        commit('clearProfile')
        commit('main/setMessage', 'your profile was succefully updated', { root: true })
        commit('main/setMode', 0, { root: true })
      })
      .catch(e => {
        commit('main/setMessage', e.message, { root: true })
      })
  }
}

export const getters = {
  profile(state) {
    return state.profile
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}