<template>
  <transition name="slideInUp">
    <div v-if="chat" class="singleChat">
       <div @click='close' class="bars">
          <div :class="{ 'bar4' : chat }" class="bar"></div>
          <div :class="{ 'bar5' : chat }" class="bar"></div>
          <div :class="{ 'bar6' : chat }" class="bar"></div>
        </div>
      <div class="header">
        <img :src='chat.photo' style='width:50px;height:auto;border-radius:50%' alt="">
        <h6>{{ chat.username }}</h6>
      </div>
      <div class="messages_container">
        <div v-for="(message, i) in chat.messages" :key="i" class="row_message" :class="message.email == user.email ? 'right' : ''">
          <div class="message">
            <div :style="message.email == user.email ? { order: 2 } : ''" class="photo">
              <img :src='message.photo' style="width:30px;height:auto;border-radius:50%" alt="">
            </div>
            <div class="text">
              {{ message.message }}
            </div>
          </div>
        </div>
      </div>
      <div class="message">
        <div class="photo">
        </div>
        <div class="text">
          <input type="text" v-model="message">
        </div>
        <div class="sent">
          <q-icon @click="sentMessage" name="send"></q-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    close() {
      return this.$store.commit('chat/setChat', '')
    },
    sentMessage() {
      if (this.message) {
        console.log(this.chat.email)
        return [
          this.$store.dispatch('chat/sendMessage', {
            message: this.message,
            email: this.chat.email
          }),
          this.message = ''
        ]
      }
    }
  },
  computed: {
    chat() {
      return this.$store.getters['chat/chat']
    },
    user() {
      return this.$store.getters['auth/user']
    }
  }
}
</script>

<style lang='scss'>
//
@import '../../css/main.scss'; 
//
.singleChat {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background-color: whitesmoke;
  text-align: center;
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
    position: absolute;
    top: 0%;
    width: 100vw;
    height: 20vh;
    padding-top: 5%;
    border-bottom: solid 1px rgba($color: #000000, $alpha: 0.1);
    @include center-col;
    h6 {
      line-height: 0px;
      margin: 7% 0;
      color: gray;
    }
  }
  .messages_container {
    height: 73vh;
    width: 100vw;
    position: fixed;
    top: 20vh;
    left: 0%;
    overflow-y: scroll;
    padding-bottom: 10vh;
    .row_message {
      display: flex;
      width: 100vw;
      padding: 5% 5% 0 5%;
      @include start-col;
      .message {
        position: relative;
        background: white;
        box-shadow: 0px 0px 30px -20px;
        border-radius: 25px;
        width: max-content;
        height: max-content;
        word-break: break-word;
        min-width: 50%;
        max-width: 80%;
        padding: 10px;
        .photo {
          flex: 2;
          @include center-row;
        }
        .text {
          flex: 4;
          @include center-row;
          color: rgb(78, 78, 78);
        }
      }
    }
    .right {
      @include end-col;
    }
  }
  .message {
    position: fixed;
    bottom: 0%;
    left: 0%;
    width: 100vw;
    height: 7vh;
    background: rgb(196, 196, 196);
    display: flex;
    .photo {
      flex: 1;
    }
    .text {
      flex: 5;
      padding-bottom: 5px;
      @include end_end;
      input {
        height: 60%;
        width: 100%;
        font-size: 15px;
        border: 0px;
        background: rgba($color: #000000, $alpha: 0);
        border-bottom: 1px solid rgb(121, 121, 121);
      }   
    }
    .sent {
      @include center-row;
      flex: 1;
    }
  }
}
</style>