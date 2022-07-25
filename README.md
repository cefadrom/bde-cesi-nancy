# BDE CESI Nancy

## Projet

- Lien du Figma avec les différentes maquettes
  graphiques : [CESI BDE](https://www.figma.com/file/hCb7s4sYfwpOjHTMTea2iV/CESI-BDE?node-id=520%3A1433)
- Lien du Notion pour organiser le
  projet : [Site web BDE](https://bdecesinancy.notion.site/Site-web-BDE-874d96f28a7f44f1829da506b91903f9)

## Développement

Voici un rapide brief sur l'organisation de l'ensemble du projet :

- Le projet se base sur du Typescript, aussi bien pour le frontend que le backend
- Le projet est découpé en [workspaces pnpm](https://pnpm.io/fr/workspaces)
- Le frontend est construit avec [Svelte](https://svelte.dev) et [Svelte Kit](https://kit.svelte.dev), avec les
  différents components dans leur propre workspace pour former une component library
- Le backend est construit avec [Directus](https://directus.io), un CMS headless et autohébergé sur lequel des
  extensions vont être développées
- Le tout sera déployé avec [Docker](https://www.docker.com/), orchestré par
  le [`docker-compse.yml`](https://docs.docker.com/compose/)
