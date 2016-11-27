# C'est quoi ce dépôt ?

[![travis badge](https://travis-ci.org/Grafikart/Front-end-boilerplate.svg)](https://travis-ci.org/Grafikart/Front-end-boilerplate)

Parce que j'en avais plein le cul de copier les fichiers de projets en projets et de configurer tout le bordel.
Le but du dépôt n'est pas d'avoir une config bullet proof capable de gérer tous les cas mais juste de répondre à mes besoins et démarrer plus rapidement mes projets.

- git clone
- cd XXX
- npm install
- npm run dev

Cela crée un serveur distribuant les assets sur http://localhost:3003 que l'on peut utiliser depuis son application PHP / Rails ou autre. 
Il suffit de charger le JS depuis ce serveur de développement sur l'environnement de dev.

![](http://media.giphy.com/media/shrIxwJ2ojtrq/giphy.gif)

## Wordpress

```php
// Dans le fichier functions.php
if ($_SERVER['SERVER_PORT'] === '8080') { // On peut remplacer cette condition ici
    wp_enqueue_script('montheme-js', 'http://localhost:3002/assets/app.js', [], '1.0', true);
} else {
    wp_enqueue_style('montheme-style', get_template_directory_uri() . '/assets/app.css');
    wp_enqueue_script('montheme-js', get_template_directory_uri() . '/assets/app.js', [], '1.0', true);
}
```

## Rails


Pour remplacer le gestionnaire d'asset de rails qui est lent as fuck.
On crée un initializer qui lie le json qui liste les assets : 

```ruby
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
```

On remplace le helper asset_path

```ruby
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

```

## A faire

- Mettre en place la fusion des media queries via https://github.com/hail2u/node-css-mqpacker mais sur le fichier final
- Trouver la grande question sur la vie, l'univers et le reste
