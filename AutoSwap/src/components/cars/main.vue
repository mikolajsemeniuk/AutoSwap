<template>
  <swiper @slideChange="slideChanged" ref="categorySwiper" :options="swiperOption" class="swiper t" :class="menu ? 'blur' : ''" :style="bg">
    <swiper-slide v-for="(c, i) in cars" :key="i" class="swiper-slide">
      <transition name="fade1">
        <div @click="setProfile(c.email)" v-if="i == swiperOption.initialSlide" class="top">
          <img :src="c.photo" style="height:38px;width:auto;border-radius:50px;box-shadow:0px 0px 30px -10px" alt="">
          <h3>{{ c.username }}</h3>
          <div class="subtitle">
            <div class="icon">
              <q-icon name="account_circle" color="white" style="font-size:20px;margin-right:5px" /> 
            </div>
            <small>
              {{ c.role }}
            </small>
          </div>
        </div>
      </transition>
      <div class="bottom">
        <img @click="setCar(c.id)" :src="c.image1" style="width:100%;height:auto;border-radius:8px; height:45%;object-fit: cover" alt="">
        <transition name="fade2">
          <div v-if="i == swiperOption.initialSlide" class="categories">
            <small @click="addTrade(trade, c)" v-for="(trade, i) in c.purpose" :key="i">
              <span class="span" :class="isInFeed(c.id, trade)"><span style="color:gray;">#</span>{{ trade }}</span>
            </small>
          </div>
        </transition>
        <div @click="setCar(c.id)" class="box">
          <transition name="fade3">
            <div v-if="i == swiperOption.initialSlide" style="transition-delay: 5s" class="title">
              <p>{{ c.model }}</p>
              <h1>{{ c.brand }}</h1>
            </div>
          </transition>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  props: ['menu'],
  data() {
    return {
      swiperOption: {
        speed: 300,
        slidesPerView: 2.5,
        centeredSlides: true,
        spaceBetween: 15,
        initialSlide: 0,
        breakpoints: {
        450: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 40,
        }
      } 
      }
    }
  },
  methods: {
    slideChanged() {
      const swiperIndex = this.$refs.categorySwiper.swiper.activeIndex;
      this.swiperOption.initialSlide = swiperIndex
      this.swiperOption.slidesPerView = 1
    },
    setProfile(email) {
      return this.$store.dispatch('profile/setProfile', email)
    },
    setCar(id) {
      return this.$store.dispatch('car/setCar', {
        id: id, 
        mode: 2,
        type: 'set'
      })
    },
    addTrade(trade, car) {
      if (trade == 'swap') {
        const check = this.swapCars.findIndex(item => item.id == car.id) > -1
        if (check) {
          return this.$store.dispatch('car/removeTrade', {
            id: car.id,
            trade: trade
          })
        } else {
          return this.$store.dispatch('car/addTrade', {
            trade: trade,
            car: car
          })
        }
      }
      if (trade == 'sell') {
        const check = this.sellCars.findIndex(item => item.id == car.id) > -1
        if (check) {
          return this.$store.dispatch('car/removeTrade', {
            id: car.id,
            trade: trade
          })
        } else {
          return this.$store.dispatch('car/addTrade', {
            trade: trade,
            car: car
          })
        }
      }
      if (trade == 'buy') {
        const check = this.buyCars.findIndex(item => item.id == car.id) > -1
        if (check) {
          return this.$store.dispatch('car/removeTrade', {
            id: car.id,
            trade: trade
          })
        } else {
          return this.$store.dispatch('car/addTrade', {
            trade: trade,
            car: car
          })
        }
      }
    },
    isInFeed(id, trade) {
      if (trade == 'swap') {
        const check = this.swapCars.findIndex(item => item.id == id) > -1
        return check ? "trade-active" : ""
      }
      if (trade == 'sell') {
        const check = this.sellCars.findIndex(item => item.id == id) > -1
        return check ? "trade-active" : ""
      }
      if (trade == 'buy') {
        const check = this.buyCars.findIndex(item => item.id == id) > -1
        return check ? "trade-active" : ""
      }
    }, 
  },
  computed: {
    cars() {
      return this.$store.getters['car/cars']
    },
    swapCars() {
      return this.$store.getters['car/swapCars']
    },
    sellCars() {
      return this.$store.getters['car/sellCars']
    },
    buyCars() {
      return this.$store.getters['car/buyCars']
    },
    bg() {
      if (this.swiperOption.initialSlide % 3 == 0) {
        return {
          backgroundImage: 'linear-gradient( 25deg, rgba(0, 132, 255, 0.69), rgb(0, 99, 192) 80%)'
        }
      } else if(this.swiperOption.initialSlide % 2 == 0) {
        return {
          backgroundImage: 'linear-gradient( 30deg, rgba(240, 114, 12, 0.5), rgba(240, 114, 12, 1) 80%)'
        }
      } else {
        return {
          backgroundImage: 'linear-gradient( 30deg, rgba(22, 99, 12, 0.8), rgba(22, 99, 12, 1) 80%)'
        }
      }
    }
  }
}
</script>

<style lang="scss">
//
@import '../../css/main.scss';
//
.swiper {
  position: fixed;
  bottom: 0%;
  left: 0%;
  top: 0%;
  right: 0%;
  z-index: 1;
  .swiper-slide {
    width: 100%;
    position: relative;
    .top {
      position: absolute;
      top: 3%;
      left: 1%;
      right: 1%;
      height: 25%;
      padding-bottom: 0%;
      @include start-col;
      h3 {
        padding-top: 3%;
        line-height: 0px;
        font-size: 22px;
        color: rgb(231, 231, 231);
      }
      .subtitle {
        display: flex;
        padding-top: 2%;
        .icon {
          flex: 1;
          @include center-col;
        }
        small {
          display: block;
          flex: 1;
          @include center-col;
          font-size: 12px;
          color: rgb(231, 231, 231);
        }
      }  
    }
    .bottom {
      position: absolute;
      bottom: 5%;
      left: 0%;
      right: 0%;
      height: 63%;
      background-color: rgba($color: #f1f1f1, $alpha: 1);
      border-radius: 8px;
      box-shadow:0px 0px 40px -20px;
      z-index: 0;
      .categories {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        small {
          margin: 4% 4%;
          cursor: pointer;
          .span {
            display: block;
            width: 45px;
            border: solid rgb(129, 129, 129) 1px;
            border-radius: 25px;
            @include center-row;
          }
          .trade-active {
            border: solid rgb(31, 122, 51) 1px;
          }
        }
      }
      .box {
        position: absolute;
        bottom: 0%;
        height: 40%;
        padding: 0 10% 7%;
        width: 80%;
        color: rgb(78, 78, 78);
        // background: red;
        @include end-first-col;
        p {
          font-size: 20px;
        }
        h1 {
          font-size: 40px;
          line-height: 0rem;
        }
      }
    }
  }
}
.blur {
  filter: blur(5px);
}
</style>