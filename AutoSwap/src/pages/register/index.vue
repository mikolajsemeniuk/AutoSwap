<template>
  <div class="register">
    <h1>Sign Up for free</h1>
    <form @submit.prevent="registerUser" class="form p-3">
      <h2>Register</h2>
      <div class="box">
        <label class="" for="username">username</label>
        <q-input ref='username' class="col" type="text" lazy-rules :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']"  outlined v-model='form.username' label='username' stack-label></q-input>
      </div>
      <div class="box">
        <label class="" for="email">email</label>
        <q-input ref='email' class="col" type="email" lazy-rules :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email adress' ]" outlined v-model='form.email' label='email' stack-label></q-input>
      </div>
      <div class="box">
        <label class="" for="password">password</label>
        <q-input ref='password' class="col" type="password" lazy-rules :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']" outlined v-model='form.password' label='password' stack-label></q-input>
      </div>
      <button>register</button>
      <small>Already have an account ? <span @click="$router.push('/login')">login in here</span></small>
      <small><span @click="$router.push('/')">Go back to home page</span></small>
    </form>
    <small class="rights">©Autoswap all rights reserved</small>
    <alert />
  </div>
</template>

<script>

import { setTimeout } from 'timers';

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    registerUser() {
      this.$refs.username.validate()
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.username.hasErrors && !this.$refs.email.hasErrors && !this.$refs.password.hasErrors) {
        this.$store.dispatch('auth/registerUser', this.form)
      }
    },
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  components: {
    'alert' : require('components/utils/alert.vue').default
  }
}
</script>

<style lang="scss">
//
@import '../../css/main.scss';
//
.register {
  background-color: rgba($color: #fffefe, $alpha: 0);
  height: 100vh;
  transition: 1.5s;
  @include center-col;
  h1 {
    font-size: 20px;
  }
  small {
    font-size: 8px;
  }
  .form {
    background-color: rgba($color: #ffffff, $alpha: 1);
    padding: 3%;
    border-radius: 10px;
    width: 80%;
    box-shadow: 0px 3px 20px -10px;
    @include center-col;
    h2 {
      margin-bottom: 30px;
      font-size: 35px;
      line-height: 0px;
    }
    .box {
      width: 100%;
    }
    button {
      margin-top: 20px;
      background-color: rgb(53, 53, 53);
      color: whitesmoke;
      border-radius: 25px;
      padding: 5px 0px 5px 0px;
      width: 100%;
    }
    small {
      font-size: 12px;
      margin-top: 3%;
      span {
        color: #046df5;
      }
    }
  }
  .rights {
    margin-top: 15%;
    font-size: 11px;

  }
}
</style>