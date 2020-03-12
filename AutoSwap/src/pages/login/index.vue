<template>
  <div class="register">
    <h1 class="">Sign Up for free</h1>
    <form @submit.prevent="loginUser" class="form">
      <h2>Login</h2>
      <div class="box">
        <label class="" for="email">email</label>
        <q-input ref='email' class="col" type="email" lazy-rules :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email adress' ]" outlined v-model='form.email' label='email' stack-label></q-input>
      </div>
      <div class="box">
        <label class="" for="password">password</label>
        <q-input ref='password' class="col" type="password" lazy-rules :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']" outlined v-model='form.password' label='password' stack-label></q-input>
      </div>
      <button class="">login</button>
      <!-- <strong>or login in with facebook or gmail</strong>
      <div class="gmail">
        <q-icon name="fab fa-facebook" style="font-size:40px;color:#255da5"></q-icon>
        <q-icon @click="gmail" name="fab fa-google-plus-g" style="font-size:40px;color:#b9493a"></q-icon>
      </div> -->
      <small>Don't have an account ? <span @click="$router.push('/register')">Register here</span></small>
      <small><span @click="$router.push('/')">Go back to the home page</span></small>
    </form>
    <small class="rights">©Autoswap all rights reserved</small>
    <alert />
  </div>
</template>

<script>

import { setTimeout } from 'timers';
import { firebase, auth, db } from 'boot/firebase'
export default {
  data() {
    return {
     form: {
        email: '',
        password: ''
     }
    }
  },
  methods: {
    loginUser() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasErrors && !this.$refs.password.hasErrors) {
        this.$store.dispatch('auth/loginUser', this.form)
      }
    },
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    // async gmail() {
    //   return this.$store.dispatch('auth/loginUserWithGmail')
    // }
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
    min-height: 70vh;
    width: 80%;
    box-shadow: 0px 3px 20px -10px;
    @include center-col;
    h2 {
      margin-bottom: 30px;
      font-size: 35px;
      line-height: 1em;
    }
    .box {
      width: 100%;
    }
    .gmail {
      @include space-around-row;
      width: 70%;
      padding-bottom: 5%;
      small {
        background-color: red;
        padding: 5px;
      }
    }
    button {
      margin-top: 5%;
      background-color: rgb(53, 53, 53);
      color: whitesmoke;
      border-radius: 25px;
      min-height: 5vh;
      padding: 5px 0px 5px 0px;
      width: 100%;
    }
    strong {
      font-size: 12px;
      font-weight: 400;
      color: gray;
      padding: 3% 0 5%;
    }
    small {
      font-size: 12px;
      margin-top: 3%;
      span {
        color: #049df5;  // color:#b9493a
      }
    }
  }
  .rights {
    margin-top: 15%;
    font-size: 11px;
    color: gray;

  }
}
</style>