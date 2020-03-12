<template>
  <div>
    <transition name="slideInUp">
      <div v-if="mode == 1" class="add">
          <div @click="close" class="bars">
            <div :class="{ 'bar4' : mode == 1 }" class="bar"></div>
            <div :class="{ 'bar5' : mode == 1 }" class="bar"></div>
            <div :class="{ 'bar6' : mode == 1 }" class="bar"></div>
          </div>
          <h2>{{check == 'add' ? 'Add car' : 'Edit Car'}}</h2>
          <div class="title">
            <small>set your primary photo<br>(obligatory)</small>
          </div>
        <!-- images loop -->
          <div class="images">
            <div v-for="(photo, index) in car.photos" :key="index" :class="{'image-active' : photo.primary}" class="photo">
              <input ref="photo" @change="takeImage($event, index, photo)" type="file">
              <div style="position:relative;">
                <q-icon @click="clearImage(photo)"
                  v-if="check == 'edit' ? !photo.primary && photo.url != 'https://firebasestorage.googleapis.com/v0/b/autoswap-f2cec.appspot.com/o/no_image?alt=media&token=a68c68b5-b439-43e7-b571-0e791641dfa5' || !photo.primary && photo.file : !photo.primary && photo.url != '' || !photo.primary && photo.file "
                  name='highlight_off'
                  style="position:absolute;top:-3vw;right:-1.5vw;font-size:20px;color:gray;"
                >
                </q-icon>
                <img v-if="check == 'add'" :src='photo.file ? photo.url : require("../../assets/no_image.jpg")' @click="$refs.photo[index].click()" alt="image1">
                <img v-else :src='photo.url' @click="$refs.photo[index].click()" alt="image1">
              </div>
              <br><small v-if='photo.file'>{{ photo.file.name | truncate(15, '...') }}</small>
              <div class="bottom-title" v-if="photo.primary">
                <transition name="squeze">
                  <small class="danger" v-if="!photo.file && stop">this photo is required</small>
                </transition>
                <br><small>set your secondary photos<br>(optional)</small>
              </div>
            </div>
          </div>
          <div class="panel-bottom-title">
            <small>set your car info<br>(obligatory)</small>
          </div>
          <!-- options loop -->
            <div v-for="(option, index) in car.options" :key="index" :class="{ 'active-option' : option.active }" class="info">
              <div @click="option.active = !option.active" class="menu">
                <div class="img">
                  <q-icon :name="option.icon" style="font-size:20px;margin-right:5px;color:#777" />
                </div>
                <div class="right">
                  {{option.name}}
                </div>
                <div class="left">
                  <strong v-if="option.name !== 'purpose'">{{ option.value }}</strong>
                  <strong v-else>{{ option.value.toString()}}</strong>
                  <transition name="squeze">
                    <small class="danger" v-if="!option.value.toString() && stop">this field is required</small>
                  </transition>
                </div>
              </div>
              <hr>
              <div v-if="!option.options" class="option-1">
                <input type="text" :placeholder='option.placeholder' v-model="option.value">
              </div>
              <div v-if="option.name === 'purpose'" class="option-2">
                <div v-for="(variant, index) in option.options" :key="index">
                  <label for="diesel">{{ variant.value }}</label>
                  <input type="checkbox" :id="index" :value='variant.value' v-model="option.value">
                </div>
              </div>
              <div v-else class="option-2">
                <div v-for="(variant, index) in option.options" :key="index">
                  <label for="diesel">{{ variant.value }}</label>
                  <input type="radio" :id="index" :value='variant.value' v-model="option.value">
              </div>
            </div>
      </div>
    </div>
  </transition>
  <transition name="rotate">
    <button v-if='mode == 0 || mode == 1' :disabled='loading' @click="change" class="plus" :class="[mode == 1 ? 'plus-active' : '', { 'darker' : loading }]"> <!-- :class="mode == 1 ? 'plus-active' : ''" -->
      <div v-if="check == 'add' && !loading">
        <div class="line" :class="mode == 1 ? 'add-active' : ''"></div>
        <div class="line"></div>
      </div>
      <q-icon v-else-if="check == 'edit' && !loading" name="check_circle_outline" style="font-size:30px"></q-icon>
      <loading v-else />
    </button>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      stop: false,
      check: 'add'
    }
  },
  methods: {
    async takeImage(event, val, photo) {
      photo.file = event.target.files[0]
      const reader = new FileReader()
      await reader.readAsDataURL(photo.file)
      reader.onload = e => {
        photo.url = e.target.result
      }
    },
    clearImage(photo) {
      photo.file = null
      if (this.check == 'add') {
        photo.file = null
        photo.url = ''
      } else {
        photo.file = null
        photo.url = 'https://firebasestorage.googleapis.com/v0/b/autoswap-f2cec.appspot.com/o/no_image?alt=media&token=a68c68b5-b439-43e7-b571-0e791641dfa5'
      }
    },
    change() { // render component or trigger addAction
      if (this.mode == 1) {
        this.add()
      } else {
        if (this.user) {
          return this.$store.dispatch('car/setCar', {
            mode: 1,
            type: 0
          })
        }
        else {
          this.$store.commit('main/setMessage', 'You have to be login to add a car')
        }
      }
    },
    add() { // add or edit car
      this.stop = false
      this.car.options.map(option => {
        if (option.value == '') {
          this.stop = true
        }
      })
      if (this.car.photos[0].file == null && this.check == 'add') {
        this.stop = true
      }
      if (!this.stop) {
        return this.$store.dispatch('car/addEdit', {
          action: this.check
        })
      }
    },
    close() { // set mode to 0, close the window
      this.stop = false
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
    },
    user() {
      return this.$store.getters['auth/user']
    },
    loading() {
      return this.$store.getters['main/loading']
    }
  },
  filters: {
    truncate (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    }
  },
  updated() {
    if (this.car.id) {
      this.check = 'edit'
    } else {
      this.check = 'add'
    }
  },
  components: {
    'loading' : require('components/utils/loading.vue').default
  }
}
</script>

<style lang="scss">
//
@import '../../css/main.scss';
//
.plus {
  position: fixed;
  bottom: 3%;
  right: 5%;
  height: 5vh;
  width: 5vh;
  background-image: linear-gradient(150deg, rgb(0, 132, 255), rgb(0, 158, 250));
  z-index: 5;
  border-radius: 50%;
  box-shadow: 0px 0px 50px -3px;
  transition: 1.3s;
  border: 0px;
  @include center-col;
  .line {
    position: relative;
    background-color: white;
    height: 2px;
    width: 25px;
    &:first-child {
      transform: rotate(90deg);
      top: 2px;
    }
  }
}
.plus-active {
  bottom: 0%;
  right: 0%;
  height: 6vh;
  width: 100vw;
  border-radius: 0%;
  transition: 1.3s;
  color: white;
}
.darker {
  background: rgb(4, 74, 139);
  opacity: .8 !important;
}
.add-active {
  transition: 1.3s;
}
.add {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  z-index: 4;
  text-align: center;
  overflow-y: scroll;
  padding-bottom: 7vh;
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
    h2 {
      padding: 1em 0 1em;
      line-height: 0px;
      font-size: 30px;
      color: #6d767b;
    }
    small {
      color: #6d767b;
    }
    .images {
      @include center-row;
      flex-wrap: wrap;
      .photo {
        width: 30vw;
        padding: 3px;
        .danger {
          color: red;
          display: block;
        }
        input {
          display: none;
        }
        img {
          height: 100px;
          max-width: 100%;
          border-radius:5px;
          object-fit: cover;
        }
        @media only screen and (min-width: 786px) {
          img {
            height: 200px;
          }
        }
        @media only screen and (min-width: 500px) {
          img {
            height: 150px;
          }
        }
      }
      .image-active {
        width: 100vw;
        img {
          height: 200px;
          width: 100%;
          object-fit: cover;
        }
      }
      @media only screen and (min-width: 786px) {
        .image-active {
          img {
            height: 400px;
          }
        }
      }
      @media only screen and (min-width: 500px) {
        .image-active {
          img {
            height: 300px;
          }
        }
      }
    }
    .info {
      text-align: left;
      height: 35px;
      overflow: hidden;
      transition: 0.3s ease-in-out;
      .menu {
        display: flex;
        height: 30px;
        padding: 2px;
        .img {
          padding-left: 3%;
          img {
            height: 20px;
            width: 20px;
          }
        }
        .right {
          flex: 3;
          padding-left: 5%;
          color: #4a5053;
        }
        .left {
          padding-right: 3%;
          flex: 2;
          strong {
            color: rgb(141, 141, 141);
          }
        }
      }
      .option-1 {
        @include center-row;
        padding: 0em 4em 0em 4em;
        input {
          background-color: rgba($color: #ffffff, $alpha: 0);
          border: rgba($color: #000000, $alpha: 0.5) 1px solid;
          border-radius: 25px;
          flex: 1;
          margin: 0.5em;
          text-align: center;
        }
      }
      .option-2 {
        @include space-around-row;
        input {
          background-color: rgba($color: #ffffff, $alpha: 0);
          border-radius: 25px;
          flex: 1;
          margin: 0.5em;
        }
      }
      .muted {
        color: gray;
        font-size: 12px;
      }
      .danger {
        color: red;
        display: block;
      }
    }
    .active-option {
      background-color: rgba(255, 255, 255, 0.4);
      height: 100px;
      margin: 3px 3px 3px 3px;
      padding: 10px 3px 10px 3px;
      transition: 0.3s ease-in-out;
      box-shadow: 0px 0px 35px -25px;
      z-index: 1;
      border-radius: 5px;
    }
}
</style>
