delete from prestations where id = 7;
delete from categorie_prestation where id in(28);
delete from users where idPersonne in (995);
delete from users where idPersonne not in (1,2,3,4,5);
insert into pack_prestation (prestation_id,pack_id) values (6,9);
insert into pack_prestation (prestation_id,pack_id) values (6,4); 
update categories set score = 5.8 where id = 5;
update pack_prestation set prestation_id = 3 where id = 6;
drop table prestations;
-- AJOUT DANS LA TABLE USERS
-- 3 ENREGISTREMENTS
-- PROBLEME AVEC LE PASSWORD, JE NE SAIS PAS COMMENT L'INSERER ENCRYPTER ...
-- FAIRE L'AJOUT D'UTILISATEUR VIA L'INTERFACE WEB ...
-- insert into users (
--     personneLogin,
--     password,
--     personneNom,
--     personnePrenom,
--     personneEmail,
--     personneDateNaissance,
--     role,
-- ) values (
--     'admin@gmail.com',
--     'admin123@',
--     'admin',
--     'admin',
--     'admin@gmail.com',
--     '1992-05-25',
--     'admin'
-- );
-- insert into users (
--     personneLogin,
--     password,
--     personneNom,
--     personnePrenom,
--     personneEmail,
--     personneDateNaissance,
--     role,
-- ) values (
--     'prestataire@gmail.com',
--     'prestataire123@',
--     'prestataire',
--     'prestataire',
--     'prestataire@gmail.com',
--     '1991-05-25',
--     'prestataire'
-- );
-- insert into users (
--     personneLogin,
--     password,
--     personneNom,
--     personnePrenom,
--     personneEmail,
--     personneDateNaissance,
--     role,
-- ) values (
--     'user@gmail.com',
--     'user123@',
--     'user',
--     'user',
--     'user@gmail.com',
--     '1993-05-25',
--     'user'
-- );

-- AJOUT DANS LA TABLE CATEGORIES
-- 3 ENREGISTREMENTS
insert into categories (
    nom,
    description,
    image,
    score
) values (
    'Anniversaire',
    'Lorem ipsum',
    NULL,
    5
);
insert into categories (
    nom,
    description,
    image,
    score
) values (
    'Soirée',
    'Lorem ipsum',
    NULL,
    4
);
insert into categories (
    nom,
    description,
    image,
    score
) values (
    'Cuisine',
    'Lorem ipsum',
    NULL,
    3
);

-- AJOUT DANS LA TABLE PRESTATIONS
-- 4 ENREGISTREMENTS
insert into prestations (
    id_user,
    nom,
    description,
    photo,
    contrainte,
    type_facturation,
    prix_type_facturation,
    duree,
    personne_min,
    personne_max,
    heure_min,
    heure_max
) values (
    1,
    'DJ all night',
    'Lorem ipsum',
    NULL,
    NULL,
    'horaire',
    250,
    '01:30',
    5,
    150,
    '08:00',
    '14:30'    
);
insert into prestations (
    id_user,
    nom,
    description,
    photo,
    contrainte,
    type_facturation,
    prix_type_facturation,
    duree,
    personne_min,
    personne_max,
    heure_min,
    heure_max
) values (
    3,
    'Clown pour anniversaire',
    'Lorem ipsum',
    NULL,
    NULL,
    'forfait',
    355,
    '08:00',
    1,
    15,
    '08:00',
    '16:30'    
);
insert into prestations (
    id_user,
    nom,
    description,
    photo,
    contrainte,
    type_facturation,
    prix_type_facturation,
    duree,
    personne_min,
    personne_max,
    heure_min,
    heure_max
) values (
    3,
    'Buffet à volonté',
    'Lorem ipsum',
    NULL,
    NULL,
    'forfait',
    455,
    '01:30',
    1,
    8,
    '08:00',
    '16:30'    
);
insert into prestations (
    id_user,
    nom,
    description,
    photo,
    contrainte,
    type_facturation,
    prix_type_facturation,
    duree,
    personne_min,
    personne_max,
    heure_min,
    heure_max
) values (
    3,
    'Cuisine Thaï',
    'Lorem ipsum',
    NULL,
    NULL,
    'forfait',
    49,
    '00:30',
    1,
    2,
    '08:00',
    '16:30'    
);

-- AJOUT DANS LA TABLE CATEGORIE_PRESTATION
-- 5 ENREGISTREMENTS
insert into categorie_prestation (
    prestation_new_id,
    categorie_new_id
) values (
    1,
    1
);
insert into categorie_prestation (
    prestation_id,
    categorie_id
) values (
    1,
    2
);
insert into categorie_prestation (
    prestation_id,
    categorie_id
) values (
    2,
    1
);
insert into categorie_prestation (
    prestation_id,
    categorie_id
) values (
    2,
    2
);
insert into categorie_prestation (
    prestation_id,
    categorie_id
) values (
    3,
    3
);

insert into evenement_prestation (
    evenement_id,
    prestation_id
) values (
    1,
    1
);

insert into evenement_prestation (
    evenement_id,
    prestation_id
) values (
    1,
    9
);

insert into pack_prestation (
    prestation_id,
    pack_id
) values (
    7,
    6
);

insert into pack_prestation (
    prestation_id,
    pack_id
) values (
    7,
    4
);

delete from evenement_prestation;

-- AJOUT DANS LA TABLE REVIEWS
-- 6 ENREGISTREMENTS
insert into reviews (
    'id_prestation',
    'note',
    'commentaire'
) values (
    1,
    4.5,
    'Niquel'
);

insert into reviews (
    'id_prestation',
    'note',
    'commentaire'
) values (
    2,
    3.5,
    'Moyen'
);

insert into reviews (
    'id_prestation',
    'note',
    'commentaire'
) values (
    3,
    5.5,
    'Excellentissime'
);

insert into reviews (
    'id_prestation',
    'note',
    'commentaire'
) values (
    3,
    2.5,
    'Nul'
);

insert into reviews (
    'id_prestation',
    'note',
    'commentaire'
) values (
    2,
    0.5,
    'Pourri'
);

insert into reviews (
    'id_prestation',
    'note',
    'commentaire'
) values (
    1,
    5.5,
    'Parfait !'
);

delete from categorie_new_prestation_new;
delete from categories where id = 2;
delete from prestations;

-- SUPPRESSION DES TABLES 
drop table users;
drop table categories;
drop table prestations;
drop table categorie_prestation;
drop table reviews;
drop table packs;
drop table pack_prestation;



update users set role = 'admin' where idPersonne = 1;
update categories set score = 5.5 where id = 2;
update categories set score = 5.2 where id = 3;
update categories set score = 4.9 where id = 4;
update categorie_prestation set categorie_id=4 where id=4;

update prestations set id = 1 where id = 6;