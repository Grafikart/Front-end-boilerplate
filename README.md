:package: Ma Configuration
==================================

[![travis badge](https://travis-ci.org/Grafikart/Front-end-boilerplate.svg)](https://travis-ci.org/Grafikart/Front-end-boilerplate)

Chaque fois que l'on commence un projet on est obligé de configurer les outils avant de pouvoir commencer et à chaque fois rien ne marche comme attendu.

![](https://media.giphy.com/media/QXxAGtM56RP6E/giphy.gif)

Pour éviter ça, ce dépôt contient ma configuration fonctionnelle pour la compilation d'assets JS / CSS / img, la création du serveur de développement et le déploiement ansible.
Le but du dépôt n'est pas d'avoir une config bullet proof capable de gérer tous les cas mais juste de répondre à mes besoins pour démarrer plus rapidement.

:triangular_ruler: Comment ça marche ?
------------------

On sait jamais si je perds la mémoire un jour...

```shell
make dev # lance le serveur de dev
make build # construit le projet
make clean # Nettoie le projet
make test # Lance les tests unitaires
make deploy # Déploie le projet
```

:book: Outils
------------------

- [Optimiser les SVG](https://jakearchibald.github.io/svgomg/)
- [SVGSprite](https://svgsprit.es/)
