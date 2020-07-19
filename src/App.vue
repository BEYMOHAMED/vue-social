<template>
  <div id="app">
    <div id="nav" v-if="!connected">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <div id="nav" v-else>
      <router-link to="/home/user/all">Home</router-link> |
      <router-link to="/home/user/friendrequest">Friends Request</router-link> |
      <router-link to="/home/user/friendship">Friends List</router-link> |
      <span @click="logout" class="disconnect">Logout</span>

    </div>
    <router-view/>
  </div>
</template>

<script>
import store from './store/index'
import Vuex from 'vuex'

export default {
  name: "App",
  computed: {
    ...Vuex.mapGetters(['connected']),
  },
  methods: {
    ...Vuex.mapActions(['disconnect']),
    logout() {
      this.disconnect()
      this.$router.go()
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.disconnect{
  color: red;
  font-weight: bold;
  cursor: pointer;
}
</style>
