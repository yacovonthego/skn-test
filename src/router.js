import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Tarif from './views/Tarif'
import Type from './views/Type'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tarif/:tarifId',
      name: 'tarif',
      component: Tarif
    },
    {
      path: '/tarif/:tarifId/type/:typeId',
      name: 'type',
      component: Type
    }
  ]
})
