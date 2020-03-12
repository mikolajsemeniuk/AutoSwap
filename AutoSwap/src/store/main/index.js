export const state = () => ({
  mode: 0,
  message: '',
  loading: false,
  loader: false,
})

export const mutations = {
  setMessage: (state, payload) => state.message = payload,
  setLoading: (state, payload) => state.loading = payload,
  setLoader: (state, payload) => state.loader = payload,
  setMode: (state, payload) => state.mode = payload
}

export const actions = {}

export const getters = {
  message: state => state.message,
  loading: state => state.loading,
  loader: state => state.loader,
  mode: state => state.mode
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}