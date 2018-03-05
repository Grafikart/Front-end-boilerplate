:package: Ma Configuration Webpack
==================================

[![travis badge](https://travis-ci.org/Grafikart/Front-end-boilerplate.svg)](https://travis-ci.org/Grafikart/Front-end-boilerplate)

Chaque fois que l'on commence un projet on est obligé de configurer les outils avant de pouvoir commencer et à chaque fois rien ne marche comme attendu.

![](https://media.giphy.com/media/QXxAGtM56RP6E/giphy.gif)

Pour éviter ça, ce dépôt contient ma configuration fonctionnelle pour la compilation d'assets JS / CSS / img.
Le but du dépôt n'est pas d'avoir une config bullet proof capable de gérer tous les cas mais juste de répondre à mes besoins pour démarrer plus rapidement.

:triangular_ruler: Comment ça marche ?
------------------

On sait jamais si je perds la mémoire un jour...

```shell
git clone https://github.com/Grafikart/Front-end-boilerplate.git
cd Front-end-boilerplate
yarn
npm run dev
```

Cela crée un serveur distribuant les assets sur http://localhost:8080 que l'on peut utiliser depuis son application PHP / Rails ou autre. 
Il suffit de charger le JS depuis ce serveur de développement sur l'environnement de dev. Un dashboard permet de vérifier la "taille" des dépendances sur http://localhost:8888

:computer: Integration
------------------------ 

### Wordpress

```php
// Dans le fichier functions.php
if ($_SERVER['SERVER_PORT'] === '8080') { // On peut remplacer cette condition ici
    wp_enqueue_script('montheme-js', 'http://localhost:8080/main.js', [], '1.0', true);
} else {
    wp_enqueue_style('montheme-style', get_template_directory_uri() . '/assets/app.css');
    wp_enqueue_script('montheme-js', get_template_directory_uri() . '/assets/main.js', [], '1.0', true);
}
```

### Ruby on Rails

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
        return '//localhost:8080/' + url
      end
    end
  end

end

```

:clock3: A faire 
----------------

- Donner un exemple Wordpress avec le manifest.json
- Plus d'exemples ?
- Trouver la grande question sur la vie, l'univers et le reste
