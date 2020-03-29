import Vue from 'vue'
import Router from 'vue-router'
import Home from '../Home.vue'
import ConfigGame from '../ConfigGame.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/config',
      name: 'configGame',
      component: ConfigGame
    }
  ]
})