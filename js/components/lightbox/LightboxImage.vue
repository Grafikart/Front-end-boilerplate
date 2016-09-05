<template>
  <div>
    <transition name="lightbox-fade">
      <img :src="src" class="lightbox__image" :style="style" @click.stop :key="src">
    </transition>
    <div class="lightbox__loading" v-if="loading"><div></div></div>
  </div>
</template>

<script>
  let resizeListener

  export default {
    props: {
      image: String
    },
    data: function () {
      return {
        loading: true,
        src: false,
        style: {}
      }
    },
    mounted: function () {
      let image = new window.Image()
      let self = this
      let setStyle = function (width, height) {
        if (width > window.innerWidth || height > window.innerHeight) {
          let ratio = width / height
          let windowRatio = window.innerWidth / window.innerHeight
          if (ratio > windowRatio) {
            width = window.innerWidth
            height = width / ratio
          } else {
            width = window.innerHeight
            height = width * ratio
          }
        }
        return {
          width: width + 'px',
          height: height + 'px',
          top: (window.innerHeight - height) * 0.5 + 'px',
          left: (window.innerWidth - width) * 0.5 + 'px'
        }
      }
      image.onload = function () {
        self.loading = false
        self.src = self.image
        self.style = setStyle(image.width, image.height)
      }
      resizeListener = function (e) {
        self.style = setStyle(image.width, image.height)
      }
      image.src = this.image
      window.addEventListener('resize', resizeListener)
    },
    destroyed: function () {
      window.removeEventListener('resize', resizeListener)
    }
  }
</script>
