<template>
  <div>
    <transition name="slideInLeft">
      <div v-if="mode == 3" class="nav-right">
          <div class="header">
            <div @click='close' class="bars">
              <div :class="{ 'bar4' : mode == 3 }" class="bar"></div>
              <div :class="{ 'bar5' : mode == 3 }" class="bar"></div>
              <div :class="{ 'bar6' : mode == 3 }" class="bar"></div>
            </div>
            <div class="addUser">
              <q-icon @click="addUser" name="add_circle_outline" style="font-size:30px;color:blue"></q-icon>
            </div>
            <div class="header-header">
              <img style="height:50px;widht:auto" src="../../assets/logoBlack.svg" alt="">
              <small>chatSwap</small>
            </div>
            <hr>
          </div>
          <div class="chats">
            <div @click="setSingleUser(chat.email)" v-for="(chat, i) in chats" :key="i" class="chats-row">
              <div class="chats-row-image">
                <img style="height:50px;width:50px;border-radius:25px;object-fit:cover;" :src="chat.photo" alt="">
              </div>
              <div class="chats-row-text">
                <b>{{ chat.username }}</b><strong> {{ chat.date | date }} </strong><br>
                    <small>{{ chat.message | truncate(30, '...') }}</small>
              </div>
            </div>
          </div>
    </div>
    </transition>
    <transition name="rotate" mode="out-in">
      <q-icon v-if="mode == 0 || mode == 3" @click="change" name="chat" class="chat-icon" :class="mode == 3 ? 'chat-icon-active' : ''"></q-icon>
    </transition>
    <transition name="rotate" mode="out-in">
      <input v-model="search" v-if="mode == 0 || mode == 3" ref="kurwa" @click="change" :class="mode == 3 ? '' : 'input-active'" class="input" type="text" :placeholder='mode == 3 ? "Search for swap-friends" : ""'>
    </transition>
  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    change() {
      if (this.mode == 3) {
        console.log('hello')// search
      } else {
        if (this.user) {
          return [
            this.$store.commit('main/setMode', 3),
            this.$store.dispatch('chat/setChats')
          ]
        } else {
          this.$store.commit('main/setMessage', 'You have to be login to use chat')
        }
      }
    },
    close() {
      this.search = ''
      return this.$store.dispatch('car/setCar', {
        mode: 0,
        type: 0
      })
    },
    addUser() {
      return this.$store.dispatch('chat/setUsers')
    },
    setSingleUser(email) {
      return this.$store.dispatch('chat/setChat', email) 
    }
  },
  computed: {
    mode() {
      return this.$store.getters['main/mode']
    },
    chats() {
      return this.$store.getters['chat/chats']
    },
    user() {
      return this.$store.getters['auth/user']
    }
  },
  filters: {
    date(value) {
      return date.formatDate(value, 'MMM D, HH:mm')
    },
    truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix
      } else  {
        return text
      }
    },
  }
}
</script>

<style lang="scss">
//
@import '../../css/main.scss'; 
//
.nav-right {
    height: 100vh;
    width: 100vw;
    position: fixed;
    background-color: whitesmoke;
    top: 0vh;
    left: 0%;
    z-index: 4;
    overflow-y: scroll;
    .header {
      .bars {
      position: fixed;
      top: 1%;
      left: 3%;
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
    .addUser {
      position: fixed;
      top: 7vh;
      right: 2vh;
    }
    &-header {
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
          float: right;
          padding-right: 15px;
          color: gray;
          font-size: 11px;
        }
      }
    }
  }
}
.nav-right-active {
  position: fixed;
  width: 10%;
  height: 10%;
  top: 70%;
  right: 3%;
}
.input {
  position: fixed;
  bottom: 3%;
  right: 15%;
  width: 100vw;
  height: 4vh;
  width: 70%;
  border-radius: 25px;
  padding: 7px 0px 7px 25px;
  background-color: rgba(131, 130, 130, 0.51);
  border: 0px;
  transition: 1.3s; 
  z-index: 5;
  box-shadow: 0px 0px 30px -10px;
}
.input-active {
  background-color: rgb(100, 100, 100);
  bottom: 10%;
  right: 5%;
  height: 5vh;
  width: 5vh;
  transition: 1.3s; 
}
::placeholder {
  color: rgb(117, 117, 117);
}
.chat-icon {
  position: fixed;
  font-size: 3vh;
  color: rgb(236, 236, 236);
  bottom: 10%;
  right: 5%;
  height: 5vh;
  width: 5vh;
  transition: 1.3s; 
  z-index: 6;
}
.chat-icon-active {
  bottom: 2.3%;
  right: 15%;
}
</style>