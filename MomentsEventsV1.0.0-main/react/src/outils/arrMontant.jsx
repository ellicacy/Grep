    // FONCTION POUR FORMATER ET RETOURNER LE TOTAL
    export const roundAmount = (total) => {
        // Convertir le total en centimes
        const montantEnCentimes = Math.round(total * 100);
        // Arrondir le total au multiple de 5 centimes inférieur
        const montantArrondi = Math.floor(montantEnCentimes / 5) * 5;
        // Convertir le total en francs suisses avec 2 décimales
        const montantFormate = (montantArrondi / 100).toFixed(2);
        return montantFormate;
    }

    export const isInt = (n) => {
        return Number(n) === n && n % 1 === 0;
    }
    
    export const isFloat = (n) => {
        return Number(n) === n && n % 1 !== 0;
    }