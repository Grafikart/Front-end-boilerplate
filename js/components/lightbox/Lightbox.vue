<style src="./lightbox.scss" lang="scss"></style>

<template>
  <transition name="lightbox-fade">
    <div class="lightbox" v-if="image" @click="close">
      <transition :name="transition">
        <lightbox-image :image="image" :key="image"></lightbox-image>
      </transition>
      <div class="lightbox__btn lightbox__next" @click.stop="next"></div>
      <div class="lightbox__btn lightbox__prev" @click.stop="prev"></div>
      <div class="lightbox__close" @click.stop="close"></div>
    </div>
  </transition>
</template>

<script>
  import store from './store'
  import LightboxImage from './LightboxImage.vue'

  export default {
    components: {LightboxImage},
    data () {
      return {
        state: store.state,
        direction: 'next'
      }
    },
    methods: {
      next: function () {
        this.direction = 'next'
        store.next()
      },
      prev: function () {
        this.direction = 'prev'
        store.prev()
      },
      close: function () {
        store.close()
      }
    },
    computed: {
      image: function () {
        if (this.state.group !== false && this.state.index !== false) {
          return this.state.images[this.state.group][this.state.index]
        }
      },
      transition: function () {
        return 'lightbox-' + this.direction
      }
    }
  }
</script>
