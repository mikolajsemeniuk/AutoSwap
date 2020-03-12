<template>
  <transition name="fade">
    <div v-if="id" class="modal">
      <small>Are You sure You want to delete this car?</small>
      <loading v-if='loading' />
      <div class="box">
        <button :disabled='loading' @click="cancel" class="primary">cancel</button>
        <button :disabled='loading' @click="destroyCar" class="secondary">delete</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['id'],
  methods: {
    cancel() {
      this.$emit('setId', '')
    },
    async destroyCar() {
      return [
          await this.$store.dispatch('car/destroyCar', this.id),
          this.$emit('setId', '')
        ]
    }
  },
  computed: {
    loading() {
      return this.$store.getters['main/loading']
    }
  },
  components: {
    'loading' : require('components/utils/loading.vue').default
  }
}
</script>

<style lang='scss' scoped>
//
  @import '../../css/main.scss'; 
//
.modal {
  @include center-col;
  text-align: center;
  position: fixed;
  padding: 15px;
  top: 40%;
  left: 20%;
  height: 60vw;
  width: 60vw;
  background: white;
  box-shadow: 0px 0px 30px -20px;
  border-radius: 4px;
  z-index: 10;
  small {
    padding-bottom: 10px;
  }
  .box {
    position: absolute;
    width: 100%;
    bottom: 0%;
    @include space-around-row;
    padding-bottom: 20px;
    .primary {
      background: #333333;
      color: white;
      border: 0px;
      padding: 0 15px 0 15px;
      border-radius: 25px;
    }
    .secondary {
      background: white;
      color: #333333;
      border: 1px #333333 solid;
      padding: 0 15px 0 15px;
      border-radius: 25px;
    }
  }
}
</style>