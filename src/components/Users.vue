<template>
  <div>
    <div v-for="user in users" :key="user.id">
      <div class="user-card">
        <router-link :to="{name: 'UserId', params: {id: user.id}}" class="name" >
          <span>{{user.username}} {{user.name}}</span>
        </router-link>
        <button @click="sendFriendRequest(user.id)" class="add-btn" v-show="!checkIfFriend(user.id)">Add friend</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
import Vuex from 'vuex'
import swal from 'sweetalert'

export default {
  store,
  name: 'Users',
  data() {
    return {
      users: [],
      myFriends: []
    }
  },
  methods: {
    ...Vuex.mapActions(['loadFriends']),
    getAllUsers() {
      axios({
        method: 'get',
        url: 'http://212.47.241.143:5000/user',
        responseType: 'stream',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      })
      .then((response) => {
        this.users = response.data
      })
    },
    pushFriends(param){
      this.loadFriends(param)
    },
    getAllFriends() {
      axios({
        method: 'get',
        url: 'http://212.47.241.143:5000/friendship',
        responseType: 'stream',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      })
      .then((response) => {
        this.pushFriends(response.data)
        this.myFriends = response.data
      })
    },
    sendFriendRequest(id) {
      axios({
        method: 'post',
        url: 'http://212.47.241.143:5000/friendship/request',
        responseType: 'stream',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        data: {
          requestedId: id
        }
      })
      .then((response) => {
        swal("Friend request sent!", "your friend will eventually accept the request!", "success")
      })
      .catch((error) => {
        swal("Something went wrong!", 'You may have already sent this friend a request', "error")
        console.log(error)
      })
    },
    checkIfFriend(id) {
      this.myFriends.forEach(element => {
        if (element.id == id) {
          return true
        }else {
          return false
        }
      });
    },
  },
  computed: {
    ...Vuex.mapGetters(['friends']),
	},
  beforeMount() {
    this.getAllUsers()
    this.getAllFriends()
  }
  }
</script>

<style>
  .user-card{
    background-color: #FFF;
    max-width: 25vw;
    margin: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px #FFF;
    padding: 20px;
  }
  .add-btn{
    background-color: #C7CEEA;
    color: #FFF;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 15px;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.1s ease-in-out;
  }

  .add-btn:hover{
    box-shadow: 0px 0px 5px 0px #C7CEEA;
  }
</style>