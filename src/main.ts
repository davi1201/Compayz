import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import moment from 'moment';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.filter('formatDate', (value: any) => {
  if (value) {
    return moment(value).format('HH:mm');
  }
  return '';
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
