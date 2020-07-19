<template>
  <div>
    <span>{{user.name}}</span><br>
    <span>{{user.username}}</span>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
import Vuex from 'vuex'

export default {
  store,
  name: 'UserInfo',
  data() {
    return {
      user: [],
      id: null
    }
  },
  methods: {
    getAllUsers() {
      axios({
        method: 'get',
        url: 'http://212.47.241.143:5000/user/me',
        responseType: 'stream',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      })
      .then((response) => {
        this.user = response.data
      })
    }
  },
  beforeMount() {
    this.getAllUsers()
  },
}
</script>

<style>

</style>