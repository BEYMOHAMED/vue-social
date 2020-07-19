<template>
  <div class="container">
    <h1>Please enter your informations</h1>
      <form
        id="app"
        @submit.prevent="checkForm"
        action="/validated"
        novalidate="true"
      >

        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
          </ul>
        </p>

        <div class="field">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            name="username"
            class="text-input"
          >
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            class="text-input"
          >
        </div>

        <p>
          <input
            type="submit"
            value="Submit"
            class="submit"
          >
        </p>

      </form>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'
import Vuex from 'vuex'
import swal from 'sweetalert'

export default {
  store,
  name: "ClientInfo",
  data() {
    return {
      errors: [],
      username: null,
      password: null,
    }
  },
  methods:{
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.username) {
        this.errors.push('Username required.');
      }else if(this.validString(this.nom))
      {
        this.errors.push('Valid Username required.');
      }

      if (!this.errors.length) {
        return this.login()
      }

      e.preventDefault();
    },
    ...Vuex.mapActions(['addToken']),
    ...Vuex.mapActions(['connect']),
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validString: function (string) {
      var re = /[^a-zA-Z]+/g
      return re.test(string);
    },
    login() {
      axios.post('http://212.47.241.143:5000/auth/login', {
        username: this.username,
        password: this.password
      })
      .then((response) => {
        if (response.status == 200) {
          this.addToken(response.data.token)
          this.connect()
          sessionStorage.setItem('token', response.data.token)
          this.$router.push('/home/user/all')
        }
      })
      .catch((error) => {
        swal("Something went wrong!", 'Username or password may be wrong', "error")
        console.log(error)
      })
    }
    
  }
}
</script>

<style>

  label{
    font-weight: bold;
    font-size: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  .field{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  li{
    color: red;
    text-transform: uppercase;
    font-weight: bold;
  }

  .text-input{
    border: none;
    border-radius: 5px;
    outline: none;
    height: 6vh;
    width: 20vw;
    padding: 10px;
  }

  .submit{
    border: none;
    background-color: #8bcdcd;
    color: #FFF;
    font-size: 20px;
    padding: 15px;
    border-radius: 10px;
    outline: none;
    font-weight: bold;
    text-transform: uppercase;
  }
</style>