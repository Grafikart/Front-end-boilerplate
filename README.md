# C'est quoi ce dépôt ?

Parceque j'en avais plein de cul de copier les fichiers de projets en projets et de configurer tout le bordel.
Le but du dépôt n'est pas d'avoir une config bullet proof capable de gérer tous les cas mais juste de répondre à mes besoins et démarrer plus rapidement les projets.

- git clone
- npm install
- gulp

![](http://media.giphy.com/media/shrIxwJ2ojtrq/giphy.gif)


## Qu'est ce qu'il y a de spécial ?

- Les images dans img/icons/@2x sont automatiquement transformées en divisant la taille par 2 dans img/icons
- Les images dans img/icons sont compilées dans une sprite.png & sprite@2x.png
- Le CSS est compilé à la racine (wordpress friendly)
- Les fichiers js/*.coffee sont compilé en js/*.js et peuvent utiliser browserify (aka require('aaa')

- Une version commonJS d'outdated browser est inclue (en attendant que mon PR soit accepté pour npm) histoire de pas s'emmerder avec IE.

## A faire

- Mettre en place la minification du CSS / JS / img
- Trouver la grande question sur la vie, l'univers et le reste