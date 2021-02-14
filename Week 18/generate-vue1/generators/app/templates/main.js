import Vue from 'vue'
import helloWorld from './helloWorld.vue'

new Vue({
  el: '#app',
  render: (h) => h(helloWorld),
})
