import Vue from 'vue'

class Store {
  constructor () {
    this.state = {
      images: {},
      group: false,
      index: false
    }
  }

  next () {
    if (this.state.index === this.state.images[this.state.group].length - 1) {
      this.state.index = 0
    } else {
      this.state.index++
    }
  }

  prev () {
    if (this.state.index === 0) {
      this.state.index = this.state.images[this.state.group].length - 1
    } else {
      this.state.index--
    }
  }

  close () {
    this.state.group = false
    this.state.index = false
  }
}

let store = new Store()

Vue.directive('lightbox', {
  bind: function (el, binding, vnode) {
    let group = binding.value.group ? binding.value.group : 'default'
    if (store.state.images[group] === undefined) Vue.set(store.state.images, group, [])
    let index = store.state.images[group].push(el.getAttribute('href'))
    let open = function (i, group) {
      return function (e) {
        e.preventDefault()
        store.state.group = group
        store.state.index = i
      }
    }
    el.addEventListener('click', open(index - 1, group))
  }
})

export default store
