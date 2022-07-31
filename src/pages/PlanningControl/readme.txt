Module Planning control

menu: Planning control

path: /planningControl

description: ce module permet la gestion des "Planning control"

-fonctionnalité:
    * selectionner un merchandiser si l'utilisateur connecté est un admin/super_admin et afficher le Planning
    * afficher le planning de l'utilisateur connecté si son role est merchandiser
    * visualiser le planning
    * visualiser les commande/stock/display de chaque visite réalisée
    * visualiser l'heure de pointage entrée/sortie de chaque visite réalisée
    * afficher le plannig par mois/semaine
    * afficher le plannig du mois/semaine prochain(e)

- code couleur des visites:
    * Rouge: visite non réalisée
    * Jaune: visite à moitié réalisée (contient stock update OU display)
    * Vert: visite réalisée (contient stock update ET display)
    * Bleu: visite non plannifiée