// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './plugins/vue-kanban'
import moment from 'moment'

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY hh:mm:ss')
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
