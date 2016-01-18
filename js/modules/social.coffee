class Social

  constructor: (via) ->
    self = this
    twitter = document.querySelector('.share_twitter')
    facebook = document.querySelector('.share_facebook')
    linkedin = document.querySelector('.share_linkedin')
    gplus = document.querySelector('.share_gplus')

    if twitter
      twitter.addEventListener 'click', (e) ->
        e.preventDefault()
        url = @getAttribute('data-url')
        shareUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + '&via=' + via + '&url=' + encodeURIComponent(url)
        self.popupCenter shareUrl, 'Partager sur Twitter'
        return

    if facebook
      facebook.addEventListener 'click', (e) ->
        e.preventDefault()
        url = @getAttribute('data-url')
        shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)
        self.popupCenter shareUrl, 'Partager sur facebook'
        return

    if gplus
      gplus.addEventListener 'click', (e) ->
      e.preventDefault()
      url = @getAttribute('data-url')
      shareUrl = 'https://plus.google.com/share?url=' + encodeURIComponent(url)
      self.popupCenter shareUrl, 'Partager sur Google+'
      return

    if linkedin
      linkedin.addEventListener 'click', (e) ->
        e.preventDefault()
        url = @getAttribute('data-url')
        shareUrl = 'https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(url)
        self.popupCenter shareUrl, 'Partager sur Linkedin'
        return

  popupCenter: (url, title, width, height) ->
    popupWidth = width or 640
    popupHeight = height or 320
    windowLeft = window.screenLeft or window.screenX
    windowTop = window.screenTop or window.screenY
    windowWidth = window.innerWidth or document.documentElement.clientWidth
    windowHeight = window.innerHeight or document.documentElement.clientHeight
    popupLeft = windowLeft + windowWidth / 2 - (popupWidth / 2)
    popupTop = windowTop + windowHeight / 2 - (popupHeight / 2)
    popup = window.open(url, title, 'scrollbars=yes, width=' + popupWidth + ', height=' + popupHeight + ', top=' + popupTop + ', left=' + popupLeft)
    popup.focus()
    true

module.exports = Social