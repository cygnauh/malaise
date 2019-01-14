# Malaise - Spécifications techniques

<br>

## I - Contexte

### Une expérience sonore interactive.
Malaise est un projet dont le but est de mettre en avant certaines maladresses que nous faisons ou que nous subissons lorsque l’on parle de différences. Pour le 1er épisode de la plateforme, nous nous sommes concentré sur le sujet “La pression sexuelle en France”. Lors de cet épisode, l’utilisateur est invité à une soirée, s’y rend, et on lui propose de participer au jeu du “Je n’ai / je n’ai jamais”. Tout au long du jeu, des débats vont ressurgir et l’utilisateur pourra prendre parti. A la fin de l’expérience, les informations complémentaires s’affichent sous forme d’article, illustrés par des images et des vidéos.

## II - Environnement technique

### REACT
On choisit d’utiliser React JS comme framework JS pour notre projet. Une techno adaptée car nous voulons créer une application web, orientée desktop. Pour customiser le code, nous aurons besoin d’installer Styled Components.

### HOWLER
Afin de pouvoir gérer les pistes audio, nous allons utiliser la librairie Howler.js, principalement les features “Sprites Audio” et “Spatial Audio”. C’est une solution qui nous permettra d’utiliser simplement une seule bande son (appelé “Sprite audio”) que l’on pourra segmenter à notre guise, sans avoir différents assets audio qui risqueraient de ralentir le chargement et la performance de l’expérience.

### LOTTIE / WEBGL / CSS
Dans le but de gérer les animations de typographies, nous avons plusieurs moyens de génération ci-dessous, nous en choisirons un selon les contraintes graphiques :
- Lottie,
- Webgl pour créer de A à Z une animation complexe,
- CSS pour des animations de typo simples et basiques.
Le plus performant serait de se focaliser sur Webgl, ce qui éviterait d’avoir de lourds  assets, qui pourraient ralentir le chargement du site et l’affichage des médias. La contrainte de cette solution est que nous ne sommes pas totalement

### GSAP
En ce qui concerne toutes les animations, les transitions… nous utiliserons GreenSock.

### RESPONSIVE
Le webdocumentaire est prévu pour fonctionner en desktop, tablette et mobile. Si le temps nous manque, seule la version desktop sera fonctionnelle, et un message d’alerte sera affiché pour les utilisations en tablette/mobile, informant l’utilisateur de jouer l’XP en desktop.

### COMPATIBILITÉ
Le site doit être compatible avec les navigateurs suivant : Chrome, Safari, Firefox. Ce sont les 3 navigateurs web les plus populaires en 2018.

### NETLIFY
Quant au déploiement, nous utiliserons Netlify pour héberger le site. Le service propose une configuration HTTPS pour le nom de domaine grâce au certificat SSL de Let’s Encrypt.

### APOLLO / GRAPHCOOL
Pour la gestion des données et l’échange entre le serveur et l’application, nous allons avoir besoin d’Apollo Client et de GraphCool qui nous permettra de gérer les requêtes envoyés au serveur et de récupérer les données stockés en base de données. A savoir que GraphCool utilise l’AWS Aurora (BDD d’Amazon)

## III - Workflow

### 1) Entre développeurs
- Nous utilisons Github pour le partage du code : chaque développeur aura sa propre branche de développement sous la forme “name-dev”, lorsqu’une fonctionnalité / intégration est terminée, la branche de chaque dev doit être mergé dans la branche development qui fera office du répertoire courant. Une fois que la  branche development est à jours et prête à être mise en ligne / ppr, il faut merger cette branche dans master. Cette dernière sera deploy automatiquement grâce à une connexion Netlify.
- La planification et la répartition des tâches ont été établies sur Trello/Planningway Calendar.
- Afin de communiquer de manière rapide, nous utilisons Messenger.

### 2) Entre développeurs & graphistes
- L’organisation entre développeurs et graphistes se fait essentiellement sur Trello avec le planning des tâches. Nous allons également utiliser Google Sheets pour les contenus textuels du scénario de notre partie XP ainsi que pour liste les animations qui sont faites.
- Les maquettes seront mis en place sur Zeplin afin de faciliter leur intégrations.
- Les assets de type médias (images, vidéos, audios) seront partagés via Google Drive.
- Nous utilisons également Messenger pour communiquer entre développeurs et graphistes.

## IV - Architecture du projet

### Architecture développement

``` yaml
/src

  /assets
    /animation
    /fonts
    /icons
    /lib
    /styles

  /components
    /elements
    /interactions
    /layout
    /pages

  /graphql
    /mutations
    /queries

  /objects

  /store

/server

```

<br>

### Scope fonctionnel
https://drive.google.com/open?id=1W5rDi2DqeiqhszyGS3KRpWGiscJNfIVB

### Schéma UML de la base de données
https://drive.google.com/open?id=1-kHnvQSh4qk32BPyNiMoQxtsxsnNOzoP
