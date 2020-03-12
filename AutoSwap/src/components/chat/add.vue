<template>
  <transition name="slideInLeft">
    <div v-if="users" class="addUserPanel">
      <div @click="close" class="bars">
        <div :class="{ 'bar4' : users }" class="bar"></div>
        <div :class="{ 'bar5' : users }" class="bar"></div>
        <div :class="{ 'bar6' : users }" class="bar"></div>
      </div>
      <div class="header">
        <img style="height:50px;widht:auto" src="../../assets/logoBlack.svg" alt="">
        <small>chatSwap</small>
      </div>
      <hr>
      <div class="chats">
        <div v-for="(user, i) in users" :key="i" class="chats-row">
          <div class="chats-row-image">
            <img style="height:50px;width:50px;border-radius:25px;object-fit:cover;" :src="user.photo" alt="">
          </div>
          <div class="chats-row-text">
            <b>{{ user.username }}</b>
            <q-icon @click="setSingleUser(user.email)" name="add_circle_outline" style="font-size:30px;color:blue"></q-icon>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutation, mapActions } from 'vuex'
export default {
  methods: {
    close() {
      return this.$store.commit('chat/setUsers', '')
    },
    setSingleUser(email) {
      return [
        this.$store.dispatch('chat/setChat', email),
        this.$store.commit('chat/setUsers', '') 
      ]
    }
  },
  computed: {
    users() { 
      return this.$store.getters['chat/users']
    }
  }
}
</script>

<style lang='scss'>
//
@import '../../css/main.scss'; 
//
.addUserPanel {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background-color: whitesmoke;
  z-index: 9;
  .bars {
    position: fixed;
    top: 1%;
    left: 3%;
    z-index: 9;
    .bar {
      width: 21px;
      height: 1px;
      background-color: rgb(2, 2, 2);
      margin-top: 7px;
      transition: 1s;
    }
    .bar4 {
      transform: rotate(-45deg) translate(-4px, 6px);
    }
    .bar5 {
      opacity: 0;
    }
    .bar6 {
      transform: rotate(45deg) translate(-5px, -7px);
    }
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em;
    font-family: 'Nunito', sans-serif;
    small {
      margin-top: 1em;
    }
  }
  .chats {
    &-row {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0.5em 0em 0.5em;
      &-image {
        flex: 1;
        padding-left: 1em;
      }
      &-text {
        flex: 5;
        strong {
          color: gray;
          font-size: 11px;
        }
      }
    }
  }
}
</style>