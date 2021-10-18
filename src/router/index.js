import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from '../views';

console.log(routes);
let router = new VueRouter({
    routes
});

export default router;
