<template>
  <div>
    <div v-for="friend in friends" :key="friend.id">
      <div class="friend-card friend">
        <img :src="image" class="user-img">
        <span class="name">{{ friend.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
import Vuex from 'vuex'
import UserImg from '../../public/media/condor.png'

export default {
  store,
  name: 'FriendList',
  data() {
    return {
      image: UserImg
    }
  },
  computed: {
    ...Vuex.mapGetters(['friends']),
	}
}
</script>

<style>
  .name{
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    color: #111;
    text-decoration: none;
  }

  .user-img {
    width: 50px;
    border-radius: 50%;
    background-color: #FFDAC1;
    padding: 10px;
  }

  .friend-card{
    background-color: #FFF;
    max-width: 19vw;
    margin: auto;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px #FFF;
    padding: 20px;
  }

  .friend{
    justify-content: space-evenly;
  }
</style>