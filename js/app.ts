let hello = 'Hello'

import Vue from 'vue'
import HelloWord from './components/HelloWord'
import Lightbox from './components/lightbox/Lightbox'

let v = new Vue({
  el: '#page',
  components: {
    HelloWord,
    Lightbox
  }
})
