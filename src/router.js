import { createRouter, createWebHistory } from 'vue-router'

const modules = import.meta.glob('@/*/route.js', { eager: true, import: 'default' })
const routes = Object.values(modules).reduce(
  (routes, route) => {
    routes.push(route)
    return routes
  },
  [{ path: '/', redirect: '/2048' }],
)

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
