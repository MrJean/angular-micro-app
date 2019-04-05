import wrap from '@vue/web-component-wrapper';
import Vue from 'vue';
import App from './App.vue';

const CustomElement = wrap(Vue, App);

window.customElements.define('client-d', CustomElement);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
