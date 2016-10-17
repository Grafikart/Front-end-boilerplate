# On charge les noms de fichier de webpack
IMAGE_ASSETS = lambda do |logical_path, filename|
  filename.start_with?(::Rails.root.join("app/assets/images").to_s) && !['.js', '.css', ''].include?(File.extname(logical_path))
end
Rails.application.config.assets.precompile = ['rails.js', IMAGE_ASSETS]

if Rails.env == 'production'
  path = Rails.root.join('public', 'assets', 'assets.json')
  if File.exist?(path)
    file = File.read(path)
    json = JSON.parse(file)
    Rails.application.config.assets.json = json
  else
    Rails.application.config.assets.json = {}
  end
end
