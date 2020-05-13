// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './plugins/vue-kanban'
import moment from 'moment'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY hh:mm:ss')
  }
});
Vue.filter('formatTime', function(value) {
  if (value) {
    // var tempTime = moment.duration(x);
    // var y = tempTime.hours() + tempTime.minutes();
    return String(moment.duration(String(value)).days()) +' Дней '+ String(moment.duration(String(value)).hours()) + ' Часов ' + String(moment.duration(String(value)).minutes()) + ' Минут ' + String(moment.duration(String(value)).seconds()) + ' Секунд'
  }
});
Vue.use(VModal)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
