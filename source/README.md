# Source de données

Le PDF fourni par l'IFAPME est la source de vérité de l'horaire.

Pour mettre à jour les données :

1. Remplacez `source/horaire_classe.pdf` par la nouvelle version.
2. Lancez `npm run import:schedule -- ./source/horaire_classe.pdf`.
3. Vérifiez `data/schedule.json`.
4. Lancez `npm run build`.

Le script regroupe les créneaux matin/après-midi lorsque le même code de matière occupe les périodes correspondantes. Il ne fusionne pas deux matières différentes dans un même bloc.
