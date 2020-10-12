import Vue from 'vue';
import App from './App.vue';
import store from './store';
import 'remixicon/fonts/remixicon.css';
import './assets/styles/style.scss';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
