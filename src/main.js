import Vue from 'vue'
import App from './App.vue'
import Tab from './components/Tab'
import Datepick from './components/Datepick'
import Calendar from 'vue-calendar-component'

Vue.config.productionTip = false

Vue.component('calendar', Calendar)
Vue.component('tab', Tab)
Vue.component('date', Datepick)

new Vue({
  render: h => h(App),
}).$mount('#app')
