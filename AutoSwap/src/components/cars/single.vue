<template>
  <transition name="slideInLeft">
  <div v-if="mode == 2" class="single">
    <swiper class="swiperPhotos" :options="swiperImagesOption">
      <swiper-slide v-for="(c, i) in car.photos" :key="i" :style="c.url == 'https://firebasestorage.googleapis.com/v0/b/autoswap-f2cec.appspot.com/o/no_image?alt=media&token=a68c68b5-b439-43e7-b571-0e791641dfa5' ? 'display:none' : ''">
        <img style="width:100%;object-fit:cover" :src="c.url" alt="" class="swiperPhotosSlide">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <h1>{{car.options[1].value}}</h1>
    <h2>{{car.options[2].value}}</h2>
    <hr>
    <div class="item-box">
      <div v-for="(c, i ) in car.options" :key="i">
        <div class="item">
          <div class="icon">
            <q-icon name="account_circle" v-if="!dots.phone" color="white" style="font-size:20px;margin-right:5px" /> 
          </div>
          <div class="name">
            {{ c.name }}
          </div>
          <div class="text">
            {{ c.value.toString() }}
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div @click="dots.phone = !dots.phone" :class="dots.phone ? 'phone-active' : ''" class="phone">
      <transition name="fade4" mode="out-in">
        <q-icon name="account_circle" v-if="!dots.phone" color="white" style="font-size:20px;margin-right:5px" /> 
        <small v-else>+48 533 838 844</small>
      </transition>
    </div>
    <a to='/swap' class="chat"><q-icon name="account_circle" v-if="!dots.phone" color="white" style="font-size:20px;margin-right:5px" /> </a>
    <div @click="dots.add = !dots.add" :class="dots.add ? 'addCat-active' : ''" class="addCat">
      <transition name="fade4" mode="out-in">
        <q-icon name="account_circle" v-if="!dots.add" color="white" style="font-size:20px;margin-right:5px" /> 
        <div v-else class="cats">
          <div class="option">
            <small>swap</small>
          </div>
          <div class="option">
            <small>sell</small>
          </div>
          <div class="option">
            <small>buy</small>
          </div>
        </div>
      </transition>
    </div>
    <div @click="close" class="bars">
      <div class="bar bar4"></div>
      <div class="bar bar5"></div>
      <div class="bar bar6"></div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      swiperImagesOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      dots: {
        phone: false,
        add: false,
      }
    }
  },
  methods: {
    close() {
      return this.$store.dispatch('car/setCar', {
        mode: 0,
        type: 0
      })
    }
  },
  computed: {
    car() {
      return this.$store.getters['car/car']
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
.single {
  overflow-y: scroll;
  z-index: 6;
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  .swiperPhotos {
    .swiperPhotosSlide {
      height: 33.333vh;
    }
  }
  h1 {
    margin-top: 10%;
    padding-left: 15%;
    font-size: 25px;
    color:rgb(49, 49, 49);
  }
  h2 {
    // text-align: center;
    padding-left: 15%;
    margin-bottom: 10%;
    font-size: 20px;
    color:rgb(104, 104, 104);
  }
  hr {
    border-width: 0.5px;
  }
  .item-box {
    .item {
      width: 100%;
      // background-color: whitesmoke;
      height: 10vh;
      @include center-row;
      .icon {
        flex: 1;
        height: 100%;
        // background-color: red;
        @include center-row;
      }
      .name {
        height: 100%;
        flex: 1;
        @include center-row;
        color: rgb(49, 49, 49);
      }
      .text {
        height: 100%;
        flex: 4;
        @include center-row;
        padding-left: 10%;
        color: gray;
      }
    }
  }
  .phone, .chat, .addCat {
    position: fixed;
    right: 5%;
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    padding-left: 5px;
    @include center-row;
    transition: 1s;
    z-index: 7; 
  }  
  .phone {
    bottom: 5%;
    background-image: linear-gradient(95deg, rgba(2, 110, 250, 0.891), rgba(9, 185, 255, 0.9));
    small {
      color: white;
    }
  }
  .phone-active {
    width: 20vh;
    border-radius: 25px;
    padding-left: 0px;
  }
  .chat {
    bottom: 12%;
    background-image: linear-gradient( 30deg, rgba(240, 114, 12, 0.5), rgba(240, 114, 12, 1) 80%);
  }
  .addCat {
    bottom: 18%;
    background-image: linear-gradient( 30deg, rgba(22, 99, 12, 0.8), rgba(22, 99, 12, 1) 80%);
    .cats {
      @include center-row;
      width: 100%;
      height: 100%;
      .option {
        flex: 1;
        height: 100%;
        // background-color: red;
        @include center-row;
        small {
          color: white;
        }
      }
    }
  }
  .addCat-active {
    width: 20vh;
    border-radius: 25px;
    padding-left: 0px;
  }
  .bars {
    position: fixed;
    top: 1%;
    left: 3%;
    z-index: 100;
    .bar {
      width: 21px;
      height: 2px;
      background-color: rgb(2, 2, 2);
      margin-top: 7px;
      transition: .5s;
    }
    .bar4 {
      transform: rotate(-45deg) translate(-5px, 8px);
    }
    .bar5 {
      opacity: 0;
    }
    .bar6 {
      transform: rotate(45deg) translate(-5px, -7px);
    }
  }
  .cross {
    position: fixed;
    top: 3%;
    left: 5%;
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    @include center-row;
  }
}
// animations
.fade4-enter-active, .fade4-leave-active {
  transition: opacity .7s;
}
.fade4-enter, .fade4-leave-to {
  opacity: 0;
}
</style>