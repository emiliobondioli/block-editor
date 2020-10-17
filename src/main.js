import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueCompositionAPI from '@vue/composition-api';
import 'remixicon/fonts/remixicon.css';
import './assets/styles/style.scss';

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
