# Espace Parents CE2 — V34.82

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
