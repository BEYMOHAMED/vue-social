import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: "",
  id: "",
  friends: null,
  connected: false
}

const getters = {
  token: (state) => state.token,
  id: (state) => state.id,
  connected: (state) => state.connected,
  friends: (state) => state.friends
}

const mutations = {
  ADD_TOKEN: (state, token) => {
    state.token = token
  },
  CONNECT: (state) => {
    state.connected = true
  },
  DISCONNECT: (state) => {
    state.connected = false
  },
  LOAD_FRIENDS: (state, arr) => {
    state.friends = arr
  }
}

const actions = {
  addToken: (store, token) => {
    store.commit('ADD_TOKEN', token)
  },
  connect: (store) => {
    store.commit('CONNECT')
  },
  disconnect: (store) => {
    store.commit('DISCONNECT')
  },
  loadFriends: (store, arr) => {
    store.commit('LOAD_FRIENDS', arr)
  }
}

let store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

global.store = store
export default store