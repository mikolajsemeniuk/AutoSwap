import { auth, db, storage } from 'boot/firebase'

export const state = () => ({
  cars: [],
  ownCars: [],
  swapCars: [],
  sellCars: [],
  buyCars: [],
  car: {
    id: '',
    date: '',
    updated: '',
    email: '',
    uid: '',
    username: '',
    photo: '',
    description: '',
    role: '',
    telephone: '',
    photos: [
      { file: null, url: '', primary: true },
      { file: null, url: '' },
      { file: null, url: '' },
      { file: null, url: '' },
      { file: null, url: '' },
      { file: null, url: '' },
      { file: null, url: '' },
    ],
    options: [
      { active: false, name: 'purpose', icon: 'group_work', placeholder: '', value: [], options: [
        { value: 'swap' },
        { value: 'sell' },
        { value: 'buy' },
      ]},
      { active: false, name: 'brand', icon: 'stars', placeholder: 'type your brand', value: '' },
      { active: false, name: 'model', icon: 'list', placeholder: 'type your model', value: '' },
      { active: false, name: 'engine', icon: 'build', placeholder: 'type your engine', value: '', options: [
        { value: 'benzine' },
        { value: 'diesel' },
        { value: 'energy' },
      ]},
      { active: false, name: 'capacity', icon: 'invert_colors', placeholder: 'type your capacity', value: '', n: true },
      { active: false, name: 'transmission', icon: 'drag_indicator', placeholder: 'type your transmission', value: '', options: [
        { value: 'automat' },
        { value: 'semi-automat' },
        { value: 'manual' },
      ]},
      { active: false, name: 'bodycar', icon: 'view_day', value: '', placeholder: 'type your bodycar', options: [
        { value: 'sedan' },
        { value: 'headback' },
        { value: 'suv' },
      ]},
      { active: false, name: 'passengers', icon: 'supervisor_account', placeholder: 'type your passengers', value: '', n: true },
      { active: false, name: 'doors', icon: 'class', placeholder: 'ammount of doors', value: '', n: true },
      { active: false, name: 'year', icon: 'event',  placeholder: 'year of production', value: '', n: true },
      { active: false, name: 'miles', icon: 'slow_motion_video', placeholder: 'miles of car', value: '', n: true },
      { active: false, name: 'color', value: '', icon: 'power_input' },
      { active: false, name: 'state', placeholder: 'state of the car', icon: 'trip_origin', value: '' },
      { active: false, name: 'airConditioning', icon: 'looks', value: '', options: [
        { value: 'yes' },
        { value: 'no' }
      ]}
    ]
  }
})

export const mutations = {
  setCars: (state, payload) => state.cars = payload, // get collection of all cars
  addCar: (state, payload) => {
    state.cars.push(payload)
  },
  updateCar: (state, payload) => {
    const i = state.cars.findIndex(item => item.id == payload.id)
    state.cars[i] = payload
  },
  removeCar: (state, payload) => {
    const i = state.cars.findIndex(item => item.id == payload)
    state.cars.splice(i, 1)
  },
  setOwnCars: (state, payload) => state.ownCars = payload,
  setSwapCars: (state, payload) => state.swapCars = payload,
  setSellCars: (state, payload) => state.sellCars = payload,
  setBuyCars: (state, payload) => state.buyCars = payload,

  setCar(state, payload) { // for edit car -> opposite to clearCar
    state.car.id = payload.id
    state.car.date = payload.date
    state.car.updated = payload.updated
    state.car.email = payload.email
    state.car.uid = payload.uid
    state.car.username = payload.username
    state.car.photo = payload.photo
    state.car.description = payload.description
    state.car.telephone = payload.telephone
    state.car.role = payload.role
    state.car.photos[0].url = payload.image1
    state.car.photos[1].url = payload.image2
    state.car.photos[2].url = payload.image3
    state.car.photos[3].url = payload.image4
    state.car.photos[4].url = payload.image5
    state.car.photos[5].url = payload.image6
    state.car.photos[6].url = payload.image7
    state.car.options[0].value = payload.purpose
    state.car.options[1].value = payload.brand
    state.car.options[2].value = payload.model
    state.car.options[3].value = payload.engine
    state.car.options[4].value = payload.capacity
    state.car.options[5].value = payload.transmission
    state.car.options[6].value = payload.bodycar
    state.car.options[7].value = payload.passengers
    state.car.options[8].value = payload.doors
    state.car.options[9].value = payload.year
    state.car.options[10].value = payload.miles
    state.car.options[11].value = payload.color
    state.car.options[12].value = payload.state
    state.car.options[13].value = payload.airConditioning
  },
  clearCar(state) { // for add car -> opposite to setCar
    state.car.photos.map(photo => {
      photo.file = null,
      photo.url = ''
    })
    state.car.options.map((option, index) => {
      if (index == 0) {
        option.value = []
      } else {
        option.value = ''
      }
    })
    state.car.id = ''
    state.car.date = ''
    state.car.updated = ''
    state.car.email = ''
    state.car.uid = ''
    state.car.username = ''
    state.car.photo = ''
    state.car.description = ''
    state.car.telephone = ''
    state.car.role = ''
  }
}

export const actions = {
  async setCars({ commit }) {
    commit('main/setLoader', true, { root: true })
    await db.collection('cars').get()
      .then(res => {
        const cars = []
        res.forEach(doc => {
          let car = doc.data()
          cars.push(car)
        })
        commit('setCars', cars)
        commit('main/setLoader', false, { root: true })
      })
      .catch(e => {
        commit('main/setMessage', 'Unknown error occured, check your wi-fi connection and pls try again later', { root: true })
        console.log(e)
        commit('main/setLoader', false, { root: true })
      })
  },
  async setOwnCars({ commit }, payload) {
    db.collection('users').doc(payload).collection('cars')
      .onSnapshot(res => {
        const cars = []
        res.forEach(doc => {
          const car = doc.data()
          cars.push(car)
        })
        commit(`setOwnCars`, cars)
      })
  },
  async setTrades({ commit }) {
    const trades = ['swap', 'sell', 'buy']
    for (let i = 0; i < trades.length; i++) {
      const converted = trades[i][0].toUpperCase() + trades[i].slice(1)
      db.collection('users').doc(auth.currentUser.email).collection(`${trades[i]}Cars`)
        .onSnapshot(res => {
          const cars = []
          res.forEach(doc => {
            const car = doc.data()
            cars.push(car)
          })
          commit(`set${converted}Cars`, cars)
        })
    }
  },
  async addTrade({ commit }, payload) {
    db.collection('users').doc(auth.currentUser.email).collection(`${payload.trade}Cars`).doc(payload.car.id).set(payload.car)
    .then(() => {
      commit('main/setMessage', `Car successfully added to ${payload.trade} cars`, { root: true })
    })
    .catch(e => {
      commit('main/setMessage', 'Unknown error occured, check your wi-fi connection and pls try again later', { root: true })
      console.log(e)
    })
  },
  async removeTrade({ commit }, payload) {
    db.collection('users').doc(auth.currentUser.email).collection(`${payload.trade}Cars`).doc(payload.id).delete()
      .then(() => {
        commit('main/setMessage', `Car was successfully deleted from ${payload.trade} cars`, { root: true })
      })
      .catch(e => {
        commit('main/setMessage', 'Unknown error occured, check your wi-fi connection and pls try again later', { root: true })
        console.log(e)
      })
  },
  async setCar({ commit }, payload) {
    if (payload.type == 'set') {
      db.collection('cars').doc(payload.id).get()
        .then(doc => {
          if (doc.exists) {
            commit('setCar', doc.data())
            commit('main/setMode', payload.mode, { root: true })
          }
        })
        .catch(e => {
          commit('main/setMessage', 'Unknown error occured, check your wi-fi connection and pls try again later', { root: true })
          console.log(e)
        })
    } else {
      commit('main/setMode', payload.mode, { root: true })
      commit('clearCar')
    }
  },
  async addEdit({ commit, state, rootState }, payload) {
    try {
      commit('main/setLoading', true, { root: true })
      let uniqid = ''
      const urlDownloaded = [], refImg = []
      urlDownloaded.length = 7
      refImg.length = 7
      if (payload.action == 'add') {
        uniqid = Math.random().toString(32).substr(2, 9) + '-' + Date.now().toString(32).substr(2, 9) + '-' + Math.random().toString(32).substr(2, 9)
        for (let i = 0; i < urlDownloaded.length; i++) {
          if (state.car.photos[i].file !== null) {
            refImg[i] = storage.ref().child(auth.currentUser.email).child('cars').child(uniqid).child(`photo${i}`)
            await refImg[i].put(state.car.photos[i].file)
          } else {
            refImg[i] = storage.ref().child('no_image')
          }
          urlDownloaded[i] = await refImg[i].getDownloadURL()
        }
      } else {
        for (let i = 0; i < urlDownloaded.length; i++) {
          if (state.car.photos[i].file !== null) { // jeśli jest plik to dodaj
            refImg[i] = storage.ref().child(auth.currentUser.email).child('cars').child(state.car.id).child(`photo${i}`)
            await refImg[i].put(state.car.photos[i].file)
          } else if (state.car.photos[i].file === null && state.car.photos[i].url != 'https://firebasestorage.googleapis.com/v0/b/autoswap-f2cec.appspot.com/o/no_image?alt=media&token=a68c68b5-b439-43e7-b571-0e791641dfa5') { // jeśli file jest nullem i zdjęcie nie jest równe no-image
            refImg[i] = storage.ref().child(auth.currentUser.email).child('cars').child(state.car.id).child(`photo${i}`)
          } else { // jeśli file jest nullem i zdjecie jest rowne no-image
            refImg[i] = storage.ref().child(auth.currentUser.email).child('cars').child(state.car.id).child(`photo${i}`)
            await refImg[i].delete()
              .then(() => { })
              .catch(() => { })
            refImg[i] = storage.ref().child('no_image')
          }
          urlDownloaded[i] = await refImg[i].getDownloadURL()
        }
      }
      const user = rootState.auth.user
      const objectToSend = { // object to send
        email: auth.currentUser.email,
        uid: user.uid,
        username: user.username,
        photo: user.photo,
        description: user.description,
        telephone: user.telephone,
        role: user.role,
        image1: urlDownloaded[0],
        image2: urlDownloaded[1],
        image3: urlDownloaded[2],
        image4: urlDownloaded[3],
        image5: urlDownloaded[4],
        image6: urlDownloaded[5],
        image7: urlDownloaded[6],
        purpose: state.car.options[0].value,
        brand: state.car.options[1].value,
        model: state.car.options[2].value,
        engine: state.car.options[3].value,
        capacity: state.car.options[4].value,
        transmission: state.car.options[5].value,
        bodycar: state.car.options[6].value,
        passengers: state.car.options[7].value,
        doors: state.car.options[8].value,
        year: state.car.options[9].value,
        miles: state.car.options[10].value,
        color: state.car.options[11].value,
        state: state.car.options[12].value,
        airConditioning: state.car.options[13].value,
      } // database
      if (payload.action == 'add') { // add Car
        const objectToAdd = Object.assign({
          id: uniqid,
          date: new Date(),
          updated: '',
        }, objectToSend)
        await db.collection(`users/${auth.currentUser.email}/cars`).doc(uniqid).set(objectToAdd)
        await db.collection('cars').doc(uniqid).set(objectToAdd)
        commit('addCar', objectToAdd)
      } else { // edit Car
        const objectToEdit = Object.assign({
          id: state.car.id,
          date: state.car.date,
          updated: new Date(),
        }, objectToSend)
        await db.collection(`users/${auth.currentUser.email}/cars`).doc(state.car.id).update(objectToEdit)
        await db.collection('cars').doc(state.car.id).update(objectToEdit)
        commit('updateCar', objectToEdit)
      }
    }
    catch (e) {
      commit('main/setLoading', true, { root: true })
      console.log(e)
      commit('main/setMessage', 'Unknown error occured, pls try again later', { root: true })
    }
    finally {
      commit('clearCar')
      commit('main/setMode', 0, { root: true })
      commit('main/setLoading', false, { root: true })
      commit('main/setMessage', `Car was succesfully ${payload.action}ed`, { root: true })
    }
  },
  async destroyCar({ commit }, payload) {
    commit('main/setLoading', true, { root: true })
    const urlDownloaded = [], refImg = []
    urlDownloaded.length = 7
    refImg.length = 7
    for (let i = 0; i < urlDownloaded.length; i++) {
      refImg[i] = storage.ref().child(auth.currentUser.email).child('cars').child(payload).child(`photo${i}`)
      await refImg[i].delete()
        .then(() => { })
        .catch(e => { })
    }
    db.collection('cars').doc(payload).delete()
    db.collection('users').doc(auth.currentUser.email).collection('cars').doc(payload).delete()
    const trades = [ 'swap', 'sell', 'buy' ]
    for (let i = 0; i < trades.length; i++) {
      db.collection('users').doc(auth.currentUser.email).collection(`${trades[i]}Cars`).doc(payload).delete()
        .then(() => {})
        .catch(e => { console.log(e) })
    }
    commit('removeCar', payload)
    commit('main/setLoading', false, { root: true })
    commit('main/setMessage', 'Car was succesfully deleted', { root: true })
  }
}

export const getters = {
  cars: state => state.cars,
  ownCars: state => state.ownCars,
  swapCars: state => state.swapCars,
  sellCars: state => state.sellCars,
  buyCars: state => state.buyCars,
  car: state => state.car
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
