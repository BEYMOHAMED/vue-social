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

        <div class="field">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            name="name"
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
      name: null,
    }
  },
  methods:{
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.username) {
        this.errors.push('nom required.');
      }else if(this.validString(this.nom))
      {
        this.errors.push('Valid nom required.');
      }

      if (!this.name) {
        this.errors.push('prenom required.');
      }else if(this.validString(this.prenom))
      {
        this.errors.push('Valid prenom required.');
      }

      if (!this.errors.length) {
        return this.register()
      }

      e.preventDefault();
    },

    ...Vuex.mapActions(['addToken']),
    ...Vuex.mapActions(['connect']),

    validString: function (string) {
      var re = /[^a-zA-Z]+/g
      return re.test(string);
    },
    register() {
      axios.post('http://212.47.241.143:5000/auth/register', {
        username: this.username,
        password: this.password,
        name: this.name
      })
      .then((response) => {
        if (response.status == 200) {
          this.$router.push('/home/user/all')
          this.addToken(response.data.token)
          this.connect()
          sessionStorage.setItem('token', response.data.token)
        }
      })
      .catch((error) => {
        swal("Something went wrong!", 'Please retry', "error")
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>