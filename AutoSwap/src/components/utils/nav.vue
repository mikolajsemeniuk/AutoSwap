<template>
  <div class="nav-top">
    <div class="menu" @click="setPanel">
      <div class="bars">
        <div :class="mode == 4 ? 'bar4' : '' " class="bar"></div>
        <div :class="mode == 4 ? 'bar5' : '' " class="bar"></div>
        <div :class="mode == 4 ? 'bar6' : '' " class="bar"></div>
      </div>
    </div>
    <div class="spacer"> {{  }} </div>
    <div @click="dots = !dots" class="dots">
      <div :class="{ 'dots-active' : dots }" class="t">
        <div class="dot t"></div>
        <div :class="{ 'dot-active' : dots }" class="dot t"></div>
        <div :class="{ 'dot-active' : dots }" class="dot t"></div>
      </div>
    </div>
    <transition name="scaleY">
      <div v-if="dots" class="window t">
        <div class="triangle"></div>
        <div class="option" v-for="(option, i) in options" :key="i">
          <div class="icon">
            <q-icon name="account_circle" color="white" style="font-size:20px;margin-right:5px" />  
          </div>
          <div class="text">
            {{option.name}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['menu'],
  data() {
    return {
      dots: false,
      options: [
        { name: 'settings', img: '' },
        { name: 'settings', img: '' },
        { name: 'chat', img: '' },
      ]
    }
  },
  methods: {
    setPanel() {
      if (this.mode != 4) {
        return this.$store.commit('main/setMode', 4)
      } else {
        return this.$store.commit('main/setMode', 0)
      }
    },
    logoutUser() {
      this.$store.dispatch('auth/logoutUser')
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    mode() {
      return this.$store.getters['main/mode']
    }  
  }
}
</script>

<style lang="scss">
//
@import '../../css/main.scss'; 
//
.nav-top {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 7vh;
  z-index: 3;
  display: flex;
  .menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .bars {
      .bar {
        width: 21px;
        height: 1px;
        background-color: rgba(247, 247, 247, 1);
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
  }
  .spacer {
    flex: 5;
  }
  .dots {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .dot {
      background-color: rgba(247, 247, 247, 1);
      border-radius: 50%;
      margin-top: 5px;
      width: 4px;
      height: 4px;
    }
    .dot-active {
      margin-top: -5px;
    }
  }
  .dots-active {
    transform: rotate(180deg);
  }
  .window {
    position: fixed;
    height: 150px;
    width: 130px;
    top: 10%;
    right: 1.5%;
    background-color: whitesmoke;
    z-index: 3;
    box-shadow: 0px 0px 30px -10px;
    border-radius: 4px;
    @include center-col;
    .triangle {
      position: absolute;
      top: -21px;
      left: 65%;
      width: 0;
      height: 0;
      border-style: solid;
      border-radius: 3px;
      border-width: 0 20px 22px 20px;
      border-color: transparent transparent whitesmoke transparent;
    }
    .option {
      padding-top: 1vw;
      padding-bottom: 1vw;
      flex: 1;
      width: 100%;
      cursor: pointer;
      @include center-row;
      &:hover {
        background-color: rgb(190, 186, 186);
        border-radius: 3px;
      }
      .icon {
        flex: 1;
        @include center-row;
        .icons {
          padding-right:5%;
          font-size: 20px;
          color: #6d767b;
        }
      }
      .text {
        flex: 2.5;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #6d767b;
        font-size: 13px;
      }
      &:last-child {
        border-top: solid 1px rgba($color: #000000, $alpha: 0.16);
        padding-top: 1.5vw;
        padding-bottom: 1.5vw;
      }
    }
  }
}
.t {
  transition: 1.3s; 
}
</style>