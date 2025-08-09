function formatEuro(montant) {
        return montant
            .toFixed(2) // garde 2 décimales
            .replace('.', ',') // remplace le point par une virgule
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') // ajoute espace tous les 3 chiffres
}

export {formatEuro};