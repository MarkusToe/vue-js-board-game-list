import Vue from 'vue';
import App from './App';
import Hello from './components/Hello.vue';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueFire from 'vuefire';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueFire);

const router = new VueRouter();

router.map({
  '/hello': {
    component: Hello,
  },
});

router.redirect({
  '*': '/hello',
});

router.start(App, '#app');
