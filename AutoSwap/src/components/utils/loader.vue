<template>
  <transition name="slideInUp">
    <div v-if="loader" class="loader"> <!--  -->
      <img src="../../assets/logoWhite.svg" style="height:20vw;width:20vw" alt="">
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    loader() { 
      return this.$store.getters['main/loader'] 
    }
  }
}
</script>

<style lang='scss' scoped>
//
  @import '../../css/main.scss'; 
//
.loader {
  background-color: rgba($color: #1b1b1b, $alpha: 1.0);
  position: fixed;
  top: 0%;
  left: 0%;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  @include center-col;
}
</style>