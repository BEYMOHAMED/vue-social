<template>
  <div>
        <h1>FriendRequest</h1>
      <div v-for="request in requests" :key="request.id">
        <div class="friend-card request">
          <img :src="image" class="user-img">
          <span class="name">{{ request.name }}</span>
          <button @click="acceptFriendRequest(request.id)" class="btn add">Accept</button>
          <button @click="denyFriendRequest(request.id)" class="btn deny">Deny</button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
import Vuex from 'vuex'
import swal from 'sweetalert'
import UserImg from '../../public/media/condor.png'

export default {
  store,
  name: 'FriendRequest',
  data() {
    return {
      requests: [],
      image: UserImg
    }
  },
  methods: {
    getFriendRequest() {
      axios({
        method: 'get',
        url: 'http://212.47.241.143:5000/friendship/request',
        responseType: 'stream',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      })
      .then((response) => {
        console.log(response)
        this.requests = response.data
      })
    },
    acceptFriendRequest(id) {
      axios({
        method: 'get',
        url: `http://212.47.241.143:5000/friendship/request/${id}/accept`,
        responseType: 'stream',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      })
      .then((response) => {
        console.log(response)
        swal("Congrats!", "You just made a new friend!", "success")
      })
    },
    denyFriendRequest(id) {
      axios({
        method: 'get',
        url: `http://212.47.241.143:5000/friendship/request/${id}/reject`,
        responseType: 'stream',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      })
      .then((response) => {
        console.log(response)
        swal("Well Done!", "you denied this friend!", "success")
      })
    }
  },
  beforeMount() {
    this.getFriendRequest()
  },
}
</script>

<style>
  .btn{
    color: #FFF;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 15px;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    transition: 0.1s ease-in-out;
  }

  .add{
    background-color: #baffc9;
  }

  .deny{
    background-color: #ffb3ba;
  }

  .request{
    justify-content: space-between;
  }
</style>