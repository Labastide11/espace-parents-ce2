# CHANGELOG — Espace Parents CE2

Historique synthétique des évolutions utiles. Les anciens fichiers README de version peuvent être supprimés après archivage de ce fichier.

## V35.81
- Ajout d’un second bandeau vert pour les messages de priorité **Normal**.
- Le bandeau principal reste réservé aux messages **Important** ou **Urgent**.
- Les messages dynamiques proviennent toujours de l’API publique (`flash` et `avenir`).

## V35.80
- Suppression du libellé « Info » dans le bandeau d’accueil.
- Le badge **Important** est conservé pour les messages prioritaires.

## V35.79
- Ajout d’un badge **Important** dans le bandeau d’accueil lorsque la priorité du message est `Important`.

## V35.78
- Correction du lien dynamique entre Progressions CE2, le Google Sheet, l’API et l’Espace Parents.
- Le bandeau attend désormais les données de l’API au lieu d’afficher un ancien message local.
- Prise en compte des messages `flash` et `avenir` visibles publiquement.
- Forçage du cache de `parents.js` via la version V35.78.

## V35.69
- Les cartes Lundi / Mardi / Jeudi / Vendredi de « La semaine en un coup d’œil » deviennent cliquables lorsqu’un devoir ou une évaluation est prévu.
- Défilement doux vers le bloc de devoir correspondant.
- Ajout d’un focus clavier visible.

## V35.68
- Correction robuste de la date dans « La semaine en un coup d’œil ».
- Jour et date générés dans un seul élément HTML, par exemple `Lundi 14 sept.`.

## V35.67
- « La semaine en un coup d’œil » affiche uniquement les quatre jours de classe.
- PC / tablette : une seule ligne.
- Téléphone : grille 2 × 2.

## V35.66
- Jour et date affichés sur une seule ligne dans les cartes de semaine.

## V35.65
- Correctif de cache mobile / Safari.
- Couleurs stabilisées pour Lecture, Dictée, Maths et Sport.

## V35.64
- Maths recoloré en jaune pastel dans les badges et le détail des devoirs.

## V35.63
- Dictée : badge rouge conservé.
- Maths : ajout d’un badge et d’un bloc de devoir dédiés.

## V35.62
- Suppression du bloc « Rappels pratiques » dans Devoirs.
- Déplacement du message sur les évaluations nationales vers « Infos de la classe ».

## V35.61
- Correction mobile de la grille 2 × 2 de « La semaine en un coup d’œil ».
- Suppression des débordements horizontaux.

## V35.60
- Sur téléphone, « La semaine en un coup d’œil » passe en grille 2 × 2 sur les quatre jours de classe.
- Suppression du défilement horizontal.

## V35.59
- Suppression du bloc redondant au-dessus de « La semaine en un coup d’œil ».
- Gain de hauteur sur mobile.

## V35.58
- Nouveau bandeau supérieur compact pour la page Devoirs.

## V35.56
- Suppression du bloc introductif fixe de la page Devoirs.
- Affichage direct des devoirs.

## V35.55
- Remplacement du compteur générique de devoirs par des badges thématiques : Lecture, Dictée, Maths, Vocabulaire, Écriture, Anglais, Leçon.

## V35.54
- Cartes de semaine rendues neutres.
- Ajout d’une pastille automatique indiquant le nombre de devoirs.

## V35.53
- Suppression de la mention « petit travail ».
- Ajout du badge vert Sport dans « La semaine en un coup d’œil ».

## V35.52
- Synchronisation de l’emploi du temps P1 avec Progressions CE2 V36.72.

## V35.51
- Synchronisation de P1 avec Progressions CE2 V36.70.
- Mise à jour des évaluations et rituels de maths depuis `data/devoirs-p1.js`.

## V35.49
- Mise à jour du message sur la fin des évaluations nationales.

## V35.48
- Nouveau statut des évaluations nationales : évaluations terminées, résultats en cours d’enregistrement.

## V35.47
- Affichage simultané de « Cette semaine » et « Semaine prochaine » dans Devoirs.
- Ajout de la mention « Pour anticiper ».

## V35.46
- Ajout d’un texte de lecture en ligne « Le kangourou » pour le lundi 14 septembre 2026.

## V35.45
- Suppression des doublons dans « En ce moment » pour les réunions de rentrée.

## V35.44
- Ajout de cartes colorées INFO / IMPORTANT pour les réunions de rentrée.

## V35.43
- Ajout des réunions de rentrée dans « En ce moment ».
- Disparition automatique après la date prévue.

## V35.42
- Simplification de « Infos de la classe » : suppression du panneau « À venir » séparé.
- Regroupement des rappels dans « À retenir toute l’année » et « En ce moment ».
- Apparition automatique 7 jours avant pour sorties, réunions et rencontres.

## V35.41
- Correction du déclencheur enseignant des statistiques.
- Réactivation du marquage `parent` / `enseignant_test`.

## V35.40
- Déplacement du déclencheur enseignant : appui long sur la grande illustration de l’accueil.

## V35.39
- Distinction entre visites parents et visites enseignant_test dans les statistiques.
