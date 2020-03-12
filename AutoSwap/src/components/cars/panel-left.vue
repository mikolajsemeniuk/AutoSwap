<template>
  <transition name="slideInRight">
    <div v-if="mode == 4" class="left-panel">
      <div v-if="user" class="loggedIn">
        <div class="nav-user">
          <img :src="user.photo" style="width:50px;heigth:auto;border-radius:50px" alt="">
          <small @click="setProfile()">Edit your profile<br>{{ user.username }}</small>
        </div>
        <div class="cars">
          <h3>your cars</h3>
          <div v-if="ownCars.length != 0">
            <div v-for="(c, i) in ownCars" :key="i" class="row">
              <div @click="setCar(c.id)" class="img">
                <img :src="c.image1" style="width:35px;heigth:35px;border-radius:50px;" alt="">
              </div>
              <div @click="setCar(c.id)" class="info">
                <small>{{ c.brand }}</small>
                <small>{{ c.model }}</small>
              </div>
              <div @click="editCar(c.id)" class="edit">
                <q-icon name="create" style="font-size:20px;color:gray"></q-icon>
              </div>
              <div @click="destroyCar(c.id)" class="delete">
                <q-icon name="highlight_off" style="font-size:20px;color:gray"></q-icon>
              </div>
            </div>
          </div>
          <div class="row">
            <strong @click="add" class="primary">add a car</strong>
          </div>
        </div>
        <div class="cars">
          <h3>cars for swap</h3>
          <div v-if="swapCars.length != 0">
            <div v-for="(c, i) in swapCars" :key="i" class="row">
              <div @click="setCar(c.id)" class="img">
                <img :src="c.image1" style="width:35px;heigth:35px;border-radius:50px;" alt="">
              </div>
              <div @click="setCar(c.id)" class="info">
                <small>{{ c.brand }}</small>
                <small>{{ c.model }}</small>
              </div>
              <div @click="removeTrade(c.id, 'swap')" class="delete">
                <q-icon name="highlight_off" style="font-size:20px;color:gray"></q-icon>
              </div>
            </div>
          </div>
          <div v-else class="row">
           <strong class="secondary">You don't have any cars already start swiping and clicking on tags to add a car</strong>
          </div>
        </div>
        <div class="cars">
          <h3>cars for sell</h3>
          <div v-if="sellCars.length != 0">
            <div v-for="(c, i) in sellCars" :key="i" class="row">
              <div @click="setCar(c.id)" class="img">
                <img :src="c.image1" style="width:35px;heigth:35px;border-radius:50px;" alt="">
              </div>
              <div @click="setCar(c.id)" class="info">
                <small>{{ c.brand }}</small>
                <small>{{ c.model }}</small>
              </div>
              <div @click="removeTrade(c.id, 'sell')" class="delete">
                <q-icon name="highlight_off" style="font-size:20px;color:gray"></q-icon>
              </div>
            </div>
          </div>
          <div v-else class="row">
           <strong class="secondary">You don't have any cars already start swiping and clicking on tags to add a car</strong>
          </div>
        </div>
        <div class="cars">
          <h3>cars for buy</h3>
          <div v-if="sellCars.length != 0">
            <div v-for="(c, i) in buyCars" :key="i" class="row">
              <div @click="setCar(c.id)" class="img">
                <img :src="c.image1" style="width:35px;heigth:35px;border-radius:50px;" alt="">
              </div>
              <div @click="setCar(c.id)" class="info">
                <small>{{ c.brand }}</small>
                <small>{{ c.model }}</small>
              </div>
              <div @click="removeTrade(c.id, 'buy')" class="delete">
                <q-icon name="highlight_off" style="font-size:20px;color:gray"></q-icon>
              </div>
            </div>
          </div>
          <div v-else class="row">
            <strong class="secondary">You don't have any cars already start swiping and clicking on tags to add a car</strong>
          </div>
        </div>
        <div class="logout">
          <button @click="logoutUser">logout</button>
        </div>
        <div class="logout">
          <small @click="$router.push('/help')">about the authors</small>
        </div>
      </div>
      <div v-else class="loggedOut">
        <div class="box">
          <h1>You have to be login to use autoswap</h1>
          <button @click="$router.push('/login')" class="primary">
            login
          </button>
          <button @click="$router.push('/register')" class="secondary">
            register
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    setProfile() {
      this.$store.commit('main/setMode', 0)
      this.$store.dispatch('profile/setProfile', this.user.email)
    },
    add() {
      return this.$store.dispatch('car/setCar', {
        mode: 1,
        type: 0
      })
    },
    setCar(id) {
      return this.$store.dispatch('car/setCar', {
        id: id,
        mode: 2,
        type: 'set'
      })
    },
    editCar(id) {
      return this.$store.dispatch('car/setCar', {
        id: id,
        mode: 1,
        type: 'set'
      })
    },
    destroyCar(id) {
      this.$emit('setId', id)
    },
    removeTrade(id, trade) {
      return this.$store.dispatch('car/removeTrade', {
        id: id,
        trade: trade
      })
    },
    logoutUser() {
      this.$store.dispatch('auth/logoutUser')
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    ownCars() {
      return this.$store.getters['car/ownCars']
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
.left-panel {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 50vw;
  padding-top: 7vh;
  height: 100vh;
  background-color: rgba(17, 17, 17, 0.8);
  z-index: 2;
  overflow-y: scroll;
  .loggedIn {
    .nav-user {
      @include center-col;
      padding: 15% 0 30%;
      small {
        text-align: center;
        color: white;
        font-size: 9px;
        margin-top: 8px;
      }
    }
    .cars {
      h3 {
        padding: 0 0 1% 5%;
        font-size: 13px;
        color: white;
        line-height: 1em;
      }
      .row {
        padding: 5px 0px 5px 0px;
        @include center-row;
        border-bottom: rgba(211, 210, 210, 0.3) solid 1px;
        .img {
          flex: 1;
          padding-left: 3%;
          @include center-col;
        }
        .info {
          flex: 5;
          @include center-col;
          small {
            font-size: 11px;
            color: white;
          }
        }
        strong {
          color: whitesmoke;
          margin: 20px;
        }
        .primary {
          border: solid 1px white;
          border-radius: 25px;
          padding: 1px 10px 1px 10px;
        }
        .secondary {
          font-size: 11px;
        }
        .edit{
          flex: 1.5;
        }
        .delete {
          flex: 1.5;
        }
      }
    }
    .cars:first-child {
      margin-top: 50px;
    }
    .logout {
      @include center-row;
      height: 10vh;
      button {
        border: 0px;
        padding: 1px 30px 1px 30px;
        border-radius: 25px;
      }
      small {
        color: whitesmoke;
        font-size: 14px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .loggedOut {
    .box {
      height: 93vh;
      @include center-col;
      padding: 0 5% 0 5%;
      text-align: center;
      h1 {
        color: white;
        font-size: 14px;
        line-height: 1.5em;
      }
      button {
        margin-top: 7%;
        width: 95%;
        padding: 4px 0 4px;
        border-radius: 25px;
        font-size: 11px;
      }
      .primary {
        color: white;
        border: 1px white solid;
        background-color: rgba($color: #000000, $alpha: 0);
      }
      .secondary {
        background-color: rgba($color: #fafafa, $alpha: 1);
        border: 0px;
      }
    }
  }
}
@media only screen and (min-width: 786px) {
  .left-panel {
    width: 30vw;
  }
}
</style>
