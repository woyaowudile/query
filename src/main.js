import Vue from 'vue';
import App from './App.vue';
import router from './router';

import _ from 'lodash';
window._ = _;

window.fetchUrl = 'http://localhost:3333';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import comps from './components';

Vue.config.productionTip = false;

Object.values(comps).forEach(comp => {
    Vue.component(comp.name, comp);
});

console.log(router);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
