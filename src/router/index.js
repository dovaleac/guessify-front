import Vue from 'vue'
import Router from 'vue-router'
import Home from '../Home.vue'
import NewRoom from '../NewRoom.vue'
import NewContender from '../NewContender.vue'
import ConfigGame from '../ConfigGame.vue'
import ConfigQuestions from '../ConfigQuestions.vue'
import Game from '../Game.vue'
import BeforeStart from '../BeforeStart.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/newRoom',
      name: 'newRoom',
      component: NewRoom
    },
    {
      path: '/newContender',
      name: 'newContender',
      component: NewContender
    },
    {
      path: '/config',
      name: 'configGame',
      component: ConfigGame
    },
    {
      path: '/questions',
      name: 'configQuestions',
      component: ConfigQuestions
    },
    {
      path: '/before-start',
      name: 'beforeStart',
      component: BeforeStart
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    }
  ]
})