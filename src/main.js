import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC_COjM5dHvkie5y8ezCU4Xxcu4XIuOTvs',
    language: 'fr',
    libraries: 'places'
  }
})

const moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {moment})

Vue.config.productionTip = false

new Vue({// eslint-disable-line no-new
  el: '#app',
  router: router,
  render: h => h(App)
})
