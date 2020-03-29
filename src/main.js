import Vue from 'vue'
import Home from './Home.vue'
import './registerServiceWorker'
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(Home),
}).$mount('#Home')
