import { LocalStorage } from 'quasar'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let user = LocalStorage.getItem('user')
    if (user && to.path == '/login' || user && to.path == '/register') {
      next('/')
    } else {
      next()
    }
  })
}

