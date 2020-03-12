<template>
  <div class="center">
    <div class="loading"></div>
      <small :class="{ 'pulsing' : loading }">please wait a minute</small>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters['main/loading']
    }
  }
}
</script>

<style lang='scss' scoped>
//
  @import '../../css/main.scss'; 
//
.center {
  @include center-col;
  .loading {
    text-align: center;
    border: 2px solid #e4e4e4;
    border-radius: 50%;
    border-top: 2px solid #333333;
    width: 21px;
    height: 21px;
    animation: spin .6s linear infinite;
  }
  small {
    font-size: 9px;
    color: whitesmoke;
  }
}
.pulsing {
  animation: pulsing 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes pulsing {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>