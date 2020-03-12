<template>
  <q-page>
    <!-- chat -->
      <chat-main />
      <chat-add />
      <chat-single />
    <!-- cars -->
      <cars-main />
      <cars-add-edit />
      <cars-single />
      <cars-panel-left @setId='setId' />
    <!-- profile -->
      <profile-main />
    <!-- utils -->
      <utils-nav />
      <utils-alert />
      <utils-loader />
      <utils-modal :id='id' @setId='setId' />
  </q-page>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        id: ''
      }
    },
    methods: {
      setId(id) {
        this.id = id
        console.log(this.id)
      },
      setCars() {
        return this.$store.dispatch('car/setCars')
      },
      setOwnCars() {
        if (this.user) {
          return this.$store.dispatch('car/setOwnCars', this.user.email)
        }
      },
      setTrades() {
        if (this.user) {
          return this.$store.dispatch('car/setTrades')
        }
      }
    },
    computed: {
      user() {
        return this.$store.getters['auth/user']
      }
    },
    watch: {
      user() {
        this.setOwnCars()
        this.setTrades()
      }
    },
    components: {
      // chat
      'chat-main' : require('components/chat/main.vue').default,
      'chat-add' : require('components/chat/add.vue').default,
      'chat-single' : require('components/chat/single.vue').default,
      // cars
      'cars-main' : require('components/cars/main.vue').default,
      'cars-add-edit' : require('components/cars/add-edit.vue').default,
      'cars-single' : require('components/cars/single.vue').default,
      'cars-panel-left' : require('components/cars/panel-left.vue').default,
      // profile
      'profile-main' : require('components/profile/main.vue').default,
      // utils
      'utils-nav' : require('components/utils/nav.vue').default,
      'utils-alert' : require('components/utils/alert.vue').default,
      'utils-loader' : require('components/utils/loader.vue').default,
      'utils-modal' : require('components/utils/modal.vue').default
    },
    created() {
      this.setCars()
      this.setOwnCars()
      this.setTrades()
    }
  }
</script>
