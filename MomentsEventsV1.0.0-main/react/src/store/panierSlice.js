import { createSlice } from "@reduxjs/toolkit";
import { roundAmount, isFloat } from "../outils/arrMontant";

const initialState = {
    titreEvenement: "",
    descriptionEvenement: "",
    adresseEvenement: "",
    npaEvenement: "",
    villeEvenement: "",
    dateEvenement: "",
    prestationPanier: [],
    packPanier: [],
    quantite: 0,
    total: 0.0,
    tva: 0.0,
    ht: 0.0,
    favorisPrestations: [],
    favorisPrestataires: [],
    status: null,
};

const panierSlice = createSlice({
    name: "panier",
    initialState,
    reducers: {
        ajouterPackPanier: (state, action) => {
            const { pack, quantite } = action.payload;
            // console.log(pack);
            // console.log(quantite);

            if (pack !== null) {
                const index = state.packPanier.findIndex(
                    (p) => p.pack?.id === pack.id
                );

                if (index !== -1) {
                    // Le pack existe déjà dans le panier, on met à jour la quantité
                    state.packPanier[index].quantite += quantite;
                } else {
                    // Le pack n'existe pas encore dans le panier, on l'ajoute
                    state.packPanier.push({
                        pack: pack,
                        quantite: quantite,
                    });
                    state.quantite = state.quantite + 1;
                }

                const montantFixe = Number.parseFloat(pack.prix_fixe).toFixed(
                    2
                );
                if (montantFixe > 0) {
                    const nouveauMontant =
                        Number.parseFloat(state.total) +
                        Number.parseFloat(montantFixe);
                    state.total = Number.parseFloat(nouveauMontant);
                    state.tva = Number.parseFloat(
                        roundAmount(state.tva + montantFixe * 0.077)
                    );
                }

                const montantUnite = Number.parseFloat(pack.prix_unite).toFixed(
                    2
                );
                if (montantUnite > 0) {
                    const montantTotal = Number.parseFloat(
                        montantUnite * quantite
                    ).toFixed(2);
                    state.total = Number.parseFloat(
                        Number.parseFloat(state.total) +
                            Number.parseFloat(montantTotal)
                    );
                    state.tva = Number.parseFloat(
                        roundAmount(state.tva + montantTotal * 0.077)
                    );
                }
                // Mettre à jour la TVA et le TTC du panier
                // TVA à 7.7%
                state.ht = state.total - state.tva;
            }
        },
        modifierQuantitePackDansPanier: (state, action) => {
            const { packId, quantite } = action.payload;
            const index = state.packPanier.findIndex(
                (p) => p.pack?.id === packId
            );

            if (index !== -1) {
                // Le pack existe déjà dans le panier, on met à jour la quantité

                if (state.packPanier[index].pack.prix_fixe > 0) {
                    state.total = state.total - pack.prix_fixe;
                } else {
                    state.total =
                        (state.total -
                            pack.prix_unite *
                                state.packPanier[index].quantite) *
                        1;
                }

                state.tva = state.total * 0.077; // TVA à 7.7%
                state.ttc = state.total + state.tva;

                state.packPanier[index].quantite = quantite;

                if (state.packPanier[index].pack.prix_fixe !== 0) {
                    state.total = state.total + pack.prix_fixe;
                } else {
                    state.total = state.total + pack.prix_unite * quantite;
                }

                state.tva = state.total * 0.077; // TVA à 7.7%
                state.ttc = state.total + state.tva;
            }
        },
        retirerPackPanier: (state, action) => {
            const { pack, quantite } = action.payload;

            const index = state.packPanier.findIndex(
                (p) => p.pack?.id === pack.id
            );

            console.log(pack.id);

            if (index !== -1) {
                // Le pack existe déjà dans le panier, on met à jour la quantité

                const montantFixe = Number.parseFloat(pack.prix_fixe).toFixed(
                    2
                );
                if (montantFixe > 0) {
                    const nouveauMontant =
                        Number.parseFloat(state.total) -
                        Number.parseFloat(montantFixe);
                    state.total = Number.parseFloat(nouveauMontant);
                    state.tva = Number.parseFloat(
                        roundAmount(state.tva - montantFixe * 0.077)
                    );
                }

                const montantUnite = Number.parseFloat(pack.prix_unite).toFixed(
                    2
                );
                if (montantUnite > 0) {
                    const montantTotal = Number.parseFloat(
                        montantUnite * state.packPanier[index].quantite
                    ).toFixed(2);
                    state.total = Number.parseFloat(
                        Number.parseFloat(state.total) -
                            Number.parseFloat(montantTotal)
                    );
                    state.tva = Number.parseFloat(
                        roundAmount(state.tva - montantTotal * 0.077)
                    );
                }
                // TVA à 7.7%
                state.ht = state.total - state.tva;

                // Retirer le pack de la liste packPanier
                state.packPanier.splice(index, 1);
                state.quantite = state.quantite - 1;

                //Vérifie si le panier est vide pour réinitialisé 
                if (state.packPanier.length === 0) {
                    state.total = 0.0;
                    state.tva = 0.0;
                    state.ht = 0.0;
                }
            }
        },
        ajouterPrestationPanier: (state, action) => {
            if (state.prestationPanier.length > 0) {
                console.log(action.payload)
                const index = state.prestationPanier.findIndex(
                    (p) => p?.id === action.payload.id
                );
                console.log(index)
                if (index === -1) {
                    state.prestationPanier.push(action.payload);
                }
            } else {
                state.prestationPanier.push(action.payload);
            }
        },
        retirerPrestationPanier: (state, action) => {
            const prestationId = action.payload.id;
            const packHasPrestation = state.packPanier.some(pack =>
                pack.pivot.some(pivot => pivot.prestation_id === prestationId)
            );
        
            if (!packHasPrestation) {
                state.prestationPanier = state.prestationPanier.filter(
                    prestation => prestation.id !== prestationId
                );
            }
        },        
        ajouterTitre: (state, action) => {
            state.titreEvenement = action.payload;
        },
        ajouterDescription: (state, action) => {
            state.descriptionEvenement = action.payload;
        },
        ajouterAdresse: (state, action) => {
            state.adresseEvenement = action.payload;
        },
        ajouterNpa: (state, action) => {
            state.npaEvenement = action.payload;
        },
        ajouterVille: (state, action) => {
            state.villeEvenement = action.payload;
        },
        ajouterDate: (state, action) => {
            state.dateEvenement = action.payload;
        },
        ajouterFavPrestation: (state, action) => {
            state.favorisPrestations.push(action.payload);
        },
        ajouterFavPrestataire: (state, action) => {
            state.favorisPrestataires.push(action.payload);
        },
        retirerFavPrestation: (state, action) => {
            state.favorisPrestations = state.favorisPrestations.filter(
                (prestation) => prestation.id !== action.payload.id
            );
        },
        retirerFavPrestataire: (state, action) => {
            state.favorisPrestataires = state.favorisPrestataires.filter(
                (prestation) => prestation.id !== action.payload.id
            );
        },
    },
});

export const {
    ajouterPackPanier,
    retirerPackPanier,
    ajouterPrestationPanier,
    retirerPrestationPanier,
    ajouterTitre,
    ajouterDescription,
    ajouterAdresse,
    ajouterNpa,
    ajouterVille,
    ajouterDate,
    ajouterFavPrestation,
    ajouterFavPrestataire,
    retirerFavPrestation,
    retirerFavPrestataire,
} = panierSlice.actions;

export default panierSlice.reducer;
