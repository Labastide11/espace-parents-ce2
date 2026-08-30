# Espace Parents CE2 — V35.32

Site public séparé de l'espace professionnel Progressions CE2.

- L'interface Parents est hébergée ici.
- Les données communes restent dans `progressions-ce2` et sont chargées depuis ce site : emploi du temps, calendrier, devoirs et informations publiées.
- Une modification de ces fichiers dans `progressions-ce2` est donc reprise automatiquement par l'Espace Parents après publication.
- Aucune page professionnelle (élèves, LSU, accompagnements, priorités, suivi individuel) n'est copiée dans ce dépôt.

GitHub Pages : Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.

Adresse attendue : `https://labastide11.github.io/espace-parents-ce2/`

- V34.82 : mots de dictée + 5 mots prioritaires lus depuis `data/parents-dictees.js`. Les données DRAS/enseignant ne sont pas chargées.

- V34.82 : correction du lien semaine ↔ banque de dictée ; une semaine sans identifiant ne retombe plus sur S1.

- V34.84 : le raccord dictée utilise en priorité le numéro visible de la semaine (`Semaine 2`, `Semaine 3`...) pour retrouver la bonne entrée de `parents-dictees.js`. Ce mode est plus robuste que l'alignement par objets internes des fichiers de devoirs.

- V34.85 : raccord dictées renforcé. La période est déduite de `__period` ou des dates, la banque publique est relue dynamiquement depuis `window.PARENTS_DICTEES_CE2`, et une seconde passe de rendu sécurise les chargements distants légèrement tardifs.

- V34.86 : suppression de la carte dictée hebdomadaire indépendante. Les mots issus de Progressions CE2 sont maintenant injectés directement dans le devoir daté `reviewDue` (normalement le jeudi, veille de la dictée du vendredi). La liaison se fait d’abord par les dates exactes `start/end`.

- V34.87 : P1 adopte le moteur annuel des devoirs : matière + verbe d’action, consigne autonome, aide/exemple, durée, lien avec le travail de classe, deuxième tâche disciplinaire éventuelle et Défi famille facultatif. Les dictées peuvent être rappelées deux fois à partir de la même banque de mots.

- V34.89 : l’Espace Parents recharge les données P3/P4 V34.98 et affiche dans « Infos de la classe → À venir » l’amorce GDVB de P3 et le Grand Défi Vivez Bougez du 22 février au 4 avril 2027.

- V34.90 : rappels pratiques automatiques dans Devoirs à partir de l’emploi du temps : EPS / Domec / natation. Lundi → rappel le vendredi pour le week-end ; mardi → lundi ; jeudi → mercredi ; vendredi → jeudi. Les rappels sont séparés et ne comptent pas comme devoirs pédagogiques.

- V34.91 : « Infos de la classe → À venir » change automatiquement selon P1 à P5. Appui long (1,2 s) sur l’icône 📅 du titre « À venir » : barre enseignant pour parcourir P1 → P5 et vérifier les messages, avec bouton « Retour auto ».

- V34.92 : nettoyage de « Infos de la classe → À venir ». Suppression de l’extraction automatique des séances ordinaires de l’emploi du temps (ex. tournoi régulé, présentation du chant). « À venir » affiche désormais uniquement les messages dédiés par période et les éventuels `upcomingItems` explicitement publiés.

- V34.93 : étape 1 multilingue appliquée sur la vraie base V34.92. Ajout du bouton discret 🌐 entre l’icône familles et « Espace Parents », ordre 🇫🇷 Français · 🇦🇪 العربية · 🇪🇸 Español · 🇬🇧 English, mémorisation locale du choix, affichage RTL pour l’arabe et traduction des contenus rendus à l’écran. Le français reste la source et le repli de sécurité. Le filtre « À venir » exclut désormais les séances ordinaires comme « tournoi régulé » ou « présentation du chant ».

- V34.94 : menu 🌐 compact sur ordinateur et téléphone. Sur mobile, largeur fixe 148 px et lignes resserrées ; le menu flotte au-dessus du contenu sans le déplacer. Fermeture après choix, clic/toucher extérieur, défilement, redimensionnement ou touche Échap.

- V35.26 : audit global des devoirs après consolidation des évaluations de français V35.63. Les anciennes annonces de français embarquées dans les fichiers de devoirs sont filtrées et remplacées par un calendrier canonique : 5 compréhensions, 4 lexiques, 3 productions d’écrits et 4 bilans de mots. Les quatre bilans de mots affichent explicitement la liste des 10 mots annoncés. Les rappels du jour J restent sans devoir supplémentaire. Les données des autres matières restent inchangées.

- V35.27 : synchronisation de la projection publique des dictées avec `dictees-ce2.js` V35.62 ; le chargement de `data/parents-dictees.js` passe de V34.96 à V35.62. Les séries Grande Muraille, Île de Pâques, Opéra de Sydney et Angkor Vat sont désormais cohérentes avec les bilans annoncés.

- V35.29 : alignement des cache-busters avec Progressions CE2 V35.66. Les cinq emplois du temps P1→P5 sont forcés en V35.66 et `data/devoirs-p3.js` passe en V35.66 afin de récupérer la correction Maths P3 (22 janvier Temps + Géométrie ; 4 février CAL-P3-01 + OPE-P3-01).


## V35.29 — cohérence des évaluations hebdomadaires
- Le bandeau « Cette semaine » est désormais calculé sur la date réelle des évaluations, toutes matières confondues.
- Une évaluation annoncée à l’avance mais prévue la semaine suivante est affichée séparément dans « À venir ».
- Le rappel du jour reprend l’intitulé précis de l’évaluation.

- V35.30 : calendrier des devoirs adapté à la semaine de classe sur 4 jours. Aucun devoir n’est affiché « Pour mercredi », samedi ou dimanche : une échéance du mercredi est rattachée au jeudi, et une échéance du week-end au lundi suivant. La règle est appliquée par le moteur à toutes les périodes P1 à P5, sans modifier les données pédagogiques sources.


- V35.31 : harmonisation du bloc « La semaine en un coup d’œil » avec les couleurs de l’emploi du temps Progressions CE2. Français rose, mathématiques bleu, anglais violet, EPS vert, arts orange, sciences cyan, histoire jaune, EMC vert clair. Une évaluation conserve la couleur de sa matière et reçoit en plus un marqueur transversal rouge « 📝 Évaluation ». Une légende compacte est ajoutée sous la semaine.

- V35.32 : double badge sur les évaluations dans Devoirs. Le premier badge indique `📝 Évaluation`; le second précise la sous-matière (lecture/compréhension, dictée/mots appris, lexique, production d’écrits, calcul/opérations, problèmes, géométrie, mesures, histoire, etc.). Les compétences évaluées et le court texte de préparation restent inchangés. Le même double badge est affiché dans le rappel du jour J.
