import { auth, db } from 'boot/firebase'

export const state = () => ({
  chats: [],
  users: '',
  chat: '',
  // single: ''
})

export const mutations = {
  setChats: (state, payload) => state.chats = payload,
  setUsers: (state, payload) => state.users = payload,
  setChat: (state, payload) => state.chat = payload,
}

export const actions = { // set all chats which user previously choosen
  setChats({ commit }) {
    db.collection('users').doc(auth.currentUser.email).collection('chat').orderBy("date", "desc")
      .onSnapshot(res => {
        const users = []
        res.forEach(doc => {
          const user = doc.data()
          users.push(user)
        })
        commit('setChats', users)
      })
  }, 
  setUsers({ commit }) { // choose from all user which you want to send message
    db.collection('users').get()
      .then(res => {
        const users = []
        res.forEach(doc => {
          let user = doc.data()
          users.push(user)
        })
        commit('setUsers', users)
      })
      .catch(e => {
        commit('main/setMessage', 'Unknown error occured, check your wi-fi connection and pls try again later', { root: true })
        console.log(e.message)
      })
  },
  async setChat({ commit }, payload) {
    db.collection('users').doc(payload).get()
    .then(doc => {
      db.collection('users').doc(auth.currentUser.email).collection('chat').doc(doc.data().email).collection('path').orderBy("date", "asc").onSnapshot(res => {
        const messages = []
        res.forEach(doc => {
          let message = doc.data()
          messages.push(message)
        })
        commit('setChat', {
          photo: doc.data().photo,
          email: doc.data().email,
          username: doc.data().username,
          messages: messages
        })
      })
    })
    .catch(e => {
      console.log(e)
    })
  },
  sendMessage({ rootState }, payload) {
    const currentUser = rootState.auth.user
    db.collection('users').doc(payload.email).get()
      .then(doc => {
        const currentUserWithDateAndMessage = Object.assign(currentUser, {
          date: Date.now(),
          message: payload.message
        })
        const receivingUserWithDateAndMessage = Object.assign(doc.data(), {
          date: Date.now(),
          message: payload.message
        })
        db.collection('users').doc(auth.currentUser.email).collection('chat').doc(doc.data().email).set(receivingUserWithDateAndMessage)
        db.collection('users').doc(doc.data().email).collection('chat').doc(auth.currentUser.email).set(currentUserWithDateAndMessage)
      })
      .catch(() => {})
    db.collection('users').doc(auth.currentUser.email).collection('chat').doc(payload.email).collection('path').add({
      message: payload.message,
      photo: currentUser.photo,
      email: currentUser.email,
      date: Date.now()
    })
    db.collection('users').doc(payload.email).collection('chat').doc(auth.currentUser.email).collection('path').add({
      message: payload.message,
      photo: currentUser.photo,
      email: currentUser.email,
      date: Date.now()
    })
  }
}

export const getters = {
  chats: state => state.chats,
  users: state => state.users,
  chat: state => state.chat
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}