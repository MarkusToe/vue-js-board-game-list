import Vue from 'vue';
import App from './App';
import All from './components/All.vue';
import Bought from './components/Bought.vue';
import Unbought from './components/Unbought.vue';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueFire from 'vuefire';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueFire);

const router = new VueRouter();

router.map({
  '/all': {
    component: All,
  },
  '/bought': {
    component: Bought,
  },
  '/unbought': {
    component: Unbought,
  },
});

router.redirect({
  '*': '/all',
});

router.start(App, '#app');
