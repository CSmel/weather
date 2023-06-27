import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueMoment from 'moment';



Vue.config.productionTip = false
Vue.use(vuetify);
Vue.use(require('vue-moment'));

new Vue({
  vuetify, VueMoment,
  render: h => h(App)
}).$mount('#app')
