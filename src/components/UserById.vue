<template>
  <div class="friend-card request">
    <img :src="image" class="user-img">
    <span class="name">{{ user.name }}</span>
    <span class="name">{{ user.username }}</span>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
import Vuex from 'vuex'
import UserImg from '../../public/media/condor.png'

export default {
  store,
  name: 'UserById',
  data() {
    return {
      user: [],
      id: null,
      image: UserImg
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  methods: {
    getAllUsers() {
      axios({
        method: 'get',
        url: `http://212.47.241.143:5000/user/${this.id}`,
        responseType: 'stream',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      })
      .then((response) => {
        this.user = response.data
        console.log(response)
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