<template>
  <transition name="slideInUp">
    <div v-if="message" class="alert">
      <div class="text">{{ message }}</div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { watch } from 'fs'
export default {
  computed: {
    ...mapGetters('main', ['message']),
  },
  watch: {
    message() {
      setTimeout(() => this.$store.commit('main/setMessage', ''), 2000)
    }
  }
}
</script>

<style lang='scss'>
//
@import '../../css/main.scss'; 
//
.alert {
  position: fixed;
  bottom: 0%;
  left: 5%;
  background: #353535;
  // transform: perspective(10px) rotateX(1deg);
  height: 9vh;
  width: 90vw;
  color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  text-align: center;
  @include center-row;
  z-index: 21;
}
</style>