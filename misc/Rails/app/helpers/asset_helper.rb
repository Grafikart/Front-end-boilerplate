module AssetHelper

  def asset_path(url)
    if url == 'rails.js'
      return super
    end
    if Rails.env == 'production'
      splits = url.split('.')
      json = Rails.application.config.assets.json
      throw splits[0] if json[splits[0]] === nil
      json[splits[0]][splits[1]]
    else
      if url.split('.').last === 'css'
        return ''
      else
        return '//localhost:3003/assets/' + url
      end
    end
  end

end
