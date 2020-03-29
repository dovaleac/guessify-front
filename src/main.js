import Vue from 'vue'
import Home from './Home.vue'
import './registerServiceWorker'
import { BootstrapVue, LayoutPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(Home),
}).$mount('#Home')
