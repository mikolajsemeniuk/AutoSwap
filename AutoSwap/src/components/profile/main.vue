<template>
  <transition name="slideInLeft">
    <div v-if="profile" class="my-profile">
      <img style="border-radius:50%;height:7vh;box-shadow:0px 0px 30px -13px;" :src="fileTemporal ? fileTemporal : profile.photo" alt="">
      <input style="display:none" ref="profileImage" @change="changeProfileImage($event)" type="file">
      <small v-if="this.user.uid == this.profile.uid" class="choose" @click="$refs.profileImage.click()"> choose image</small>
      <h3>{{ profile.username }}</h3>
      <div class="row">
        <div class="icon">
          <q-icon name="email" style="font-size:30px;color:rgb(73, 72, 72)"></q-icon>
        </div>
        <div class="name">
          <small>email</small>
        </div>
        <div class="text">
          <small>{{ profile.email }}</small>
        </div>
      </div>
     <div class="row">
        <div class="icon">
          <q-icon name="call" style="font-size:30px;color:rgb(73, 72, 72)"></q-icon>
        </div>
        <div class="name">
          <small>phone</small>
        </div>
        <div class="text">
          <small v-if="profile.telephone && this.user.uid != this.profile.uid">{{ profile.telephone }}</small>
          <small v-else-if="!profile.telephone && this.user.uid != this.profile.uid">no number provided</small>
          <input v-else v-model="profile.telephone"/>
        </div>
      </div>
      <div class="row">
        <div class="icon">
          <q-icon name="perm_identity" style="font-size:30px;color:rgb(73, 72, 72)"></q-icon>
        </div>
        <div class="name">
          <small>role</small>
        </div>
        <div class="text">
          <select v-if="this.user.uid == this.profile.uid" style="font-size:15px;color:gray" v-model="profile.role">
            <option v-for="(option, i) in options" :value="option" :key="i">
              {{ option }}
            </option>
          </select> 
          <small v-else>{{ profile.role }}</small>
        </div>
      </div>
      <textarea v-if="this.user.uid == this.profile.uid" v-model="profile.description"></textarea>
      <p v-else>{{ profile.description }}</p>
      <button v-if="this.user.uid == this.profile.uid" class="update" @click="updateProfile">Update</button>
      <div @click="clearProfile" class="bars">
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
      file: null,
      fileTemporal: null,
      options: ['Person', 'Entreprenuer', 'Company']
    }
  },
  methods: {
    changeProfileImage(event) {
      this.file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.file)
      reader.onload = (e) => {
        this.fileTemporal = e.target.result
      }
    },
    updateProfile() {
      return this.$store.dispatch('profile/updateProfile', {
        email: this.profile.email,
        photo: this.profile.photo,
        image: this.file,
        description: this.profile.description,
        role: this.profile.role,
        telephone: this.profile.telephone,
      })
    },
    clearProfile() {
      return this.$store.commit('profile/clearProfile')
    }
  },
  computed: {
    profile() {
      return this.$store.getters['profile/profile']
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
.my-profile {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  z-index: 5;
  text-align: center;
  overflow-y: scroll;
  padding-top: 20%;
  @include start-vertical-col;
  h3 {
    line-height: 1em;
    color: rgb(73, 72, 72);
    font-size: 20px;
    width: 100vw;
    padding-bottom: 17%;
    margin: 5% 0% 5%;
    border-bottom: solid rgba($color: #000000, $alpha: 0.1) 1px;
  }
  .row {
    width: 90vw;
    height: 5vh;
    margin: 5px;
    color: gray;
    .icon, .name {
      flex: 1;
      @include center-row;
      font-size: 15px;
    }
    .text {
      flex: 5;
      font-size: 25px;
      @include end-col;
      padding-right: 10%;
      input {
        color: gray;
        font-size: 13px;
        background: whitesmoke;
        border: 0px;
      }
    }
  }
  textarea {
    width: 100vw;
    min-height:20vh;
    margin-top: 3%;
    padding-top: 15%;
    text-align:center;
    background-color: whitesmoke;
    box-shadow: 0px 0px 30px -25px;
    border: 0px;
    color: gray;
  }
  p {
    margin-top: 10%;
    color: gray;
  }
  .choose {
    background-color: rgb(12, 88, 158);
    margin: 3% 0 0%;
    border-radius: 4px;
    padding: 10px 25px 10px 25px;
    font-size: 11px;
    color: white;
  }
  .update {
    margin: 15% 15px 10% 15px;
    border-radius: 4px;
    padding: 10px 25px 10px 25px;
    color: white;
    background-color: rgb(11, 107, 197);
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
}
</style>