<template>
  <div class="help">
    <h1>
      Hi,this app was made and designed by Mikolaj Semeniuk and originator was Miguel Morales,
      also in the project contributted Piotr Chmielewski,
      which helped to launch autoswap to google store.
      If You have any ideas how we could develop or what we could change please
      contact us on emails below and share your feedback with us :)
    </h1>
    <hr>
    <h2>About the author</h2>
    <h3>Mikolaj Semeniuk</h3>
    <small @click="semeniuk">m.semeniuk@icloud.com</small>
    <hr>
    <h2>About the Contributor</h2>
    <h3>Piotr Chmielewski</h3>
    <small @click="chmielewski">p.chmielewski27@gmail.com</small>
    <hr>
    <h2>About the originator</h2>
    <h3>Miguel Morales</h3>
    <small @click="morales">miguel.moralespm99@gmail.com</small>
    <hr>
    <small @click="$router.push('/')">Go back to the home page</small>
  </div>
</template>

<script>
export default {
  methods: {
    semeniuk() {
      window.location.href = 'mailto: m.semeniuk@icloud.com?subject=Feedback'
    },
    morales() {
      window.location.href = 'mailto: miguel.moralespm99@gmail.com?subject=Feedback'
    },
    chmielewski() {
      window.location.href = 'mailto: p.chmielewski27@gmail.com?subject=Feedback'
    }
  }
}
</script>

<style lang='scss'>
.help {
  position: absolute;
  top: 0%;
  min-height: 80vh;
  width: 100vw;
  text-align: center;
  background: whitesmoke;
  padding: 10%;
  h1 {
    font-size: 14px;
    line-height: 1.5em;
    color:rgb(58, 57, 57);
  }
  h2 {
    font-size: 20px;
    color: rgb(90, 90, 90);
    line-height: 2em;
  }
  h3 {
    font-size: 18px;
    color: rgb(114, 114, 114);
    line-height: 2em;
  }
  small {
    font-size: 15px;
    color: rgba($color: #0898f8, $alpha: 1.0);
  }
  small:last-child {
    display: block;
    margin-top: 15%;
    text-decoration: underline;
  }
}
</style>