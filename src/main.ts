import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'vue3-toastify/dist/index.css';

import {createApp} from 'vue'
import App from './App.vue'
import Vue3Toastify, {type ToastContainerOptions} from "vue3-toastify";

createApp(App).use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions).mount('#app')
