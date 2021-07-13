import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import views from '../views';

console.log(views);
let router = new VueRouter({
    views
});

export function createRouter() {
    return router;
}
