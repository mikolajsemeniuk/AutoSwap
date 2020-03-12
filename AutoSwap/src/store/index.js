import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import auth from './auth/index'
import profile from './profile/index'
import car from './cars/index'
import chat from './chat/index'
import main from './main/index'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      profile,
      car,
      chat,
      main,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  })

  return Store
}
