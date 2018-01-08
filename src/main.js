import 'keen-ui/src/bootstrap'

import Vue from 'vue'
import App from './App.vue'

Vue.filter('numberFixedTwo', (number) => {
  return parseFloat(number).toFixed(2)
})

export default new Vue({
  el: '#app',
  render: h => h(App)
})
