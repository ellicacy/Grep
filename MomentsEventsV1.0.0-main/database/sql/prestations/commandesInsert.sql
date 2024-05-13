INSERT INTO prestations (id_user, nom, description, photo, contrainte, type_facturation, prix_type_facturation, duree, personne_min, personne_max, heure_min, heure_max)
VALUES
(1, 'DJ', 'Prêt à mettre le feu à votre soirée', 'avatars/default.jpeg', 'Liste de toutes les contraintes', 'Prix à l''heure', 25.50, 2, 5, 15, 09, 22),
(1, 'Photographe', 'Capturer les moments précieux de vos événements', 'avatars/default.jpeg', 'Doit avoir accès à toutes les zones de l''événement', 'Forfait', 200, 4, 1, 100, 08, 20),
(1, 'Groupe de musique', 'Groupe live pour animer vos soirées et réceptions', 'avatars/default.jpeg', 'Besoin d''une scène et d''équipement audio fourni', 'Prix par événement', 500, 5, 10, 500, 10, 24),
(1, 'Animateur', 'Animation pour enfants et adultes, activités variées', 'avatars/default.jpeg', 'Espace dédié pour les activités', 'Prix par jour', 150, 1, 20, 200, 09, 18),
(1, 'Traiteur', 'Service de restauration haut de gamme pour tous types d''événements', 'avatars/default.jpeg', 'Accès à une cuisine sur place', 'Prix par personne', 15, NULL, 10, 100, NULL, NULL),
(1, 'Pizzaiolo', 'Votre chef pizzaïolo pour des événements savoureux', 'avatars/default.jpeg', 'Besoin d''un four à pizza sur place et d''une préparation en amont', 'Prix par événement', 300, 3, 1, 50, '12:00', '23:00');

