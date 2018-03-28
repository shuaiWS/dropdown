import Vue from 'vue'
import App from './App'
import MyDropdown from './components'
Vue.config.productionTip = false

Vue.use(MyDropdown)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App)
})