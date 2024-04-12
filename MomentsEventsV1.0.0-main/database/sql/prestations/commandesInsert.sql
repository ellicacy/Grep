INSERT INTO prestations (id_user, nom, description, photo, contrainte, type_facturation, prix_type_facturation, duree, personne_min, personne_max, heure_min, heure_max)
VALUES
(2, 'DJ', 'Prêt à mettre le feu à votre soirée', 'avatars/default.jpeg', 'Liste de toutes les contraintes', 'Prix à l''heure', 25.50, 2, 5, 15, 09, 22),
(1, 'Photographe', 'Capturer les moments précieux de vos événements', 'avatars/default.jpeg', 'Doit avoir accès à toutes les zones de l''événement', 'Forfait', 200, 4, 1, 300, 08, 20),
(4, 'Groupe de musique', 'Groupe live pour animer vos soirées et réceptions', 'avatars/default.jpeg', 'Besoin d''une scène et d''équipement audio fourni', 'Prix par événement', 500, 5, 10, 500, 10, 24),
(5, 'Animateur', 'Animation pour enfants et adultes, activités variées', 'avatars/default.jpeg', 'Espace dédié pour les activités', 'Prix par jour', 150, 3, 20, 200, 09, 18),
(6, 'Traiteur', 'Service de restauration haut de gamme pour tous types d''événements', 'avatars/default.jpeg', 'Accès à une cuisine sur place', 'Prix par personne', 35, NULL, 10, 300, NULL, NULL);
