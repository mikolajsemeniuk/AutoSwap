
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') },
      { path: '/login', component: () => import('pages/login/index.vue') },
      { path: '/register', component: () => import('pages/register/index.vue') },
      { path: '/help', component: () => import('pages/help/index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/errors/error404.vue')
  })
}

export default routes
