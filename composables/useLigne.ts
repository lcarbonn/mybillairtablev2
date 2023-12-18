/**
 * get all Lignes for the numFac Facture and set state
 */
export const getStateLignes = (numFac:string) => {
    getLignesDb(numFac).then((list) => {
        useLignes().value = list
    })
}

/**
 * Update the facture ligne with the given ligne data and set state
 * @param ligne - the ligne
 */
export const updateStateLigne = (ligne:ILigne) => {
    updateLigneDb(ligne).then((updatedLigne) => {
        let lignes:ILigne[] = []
        useLignes().value.forEach(l => {
            if(l.id == updatedLigne.id) {
                l = updatedLigne
            }
            lignes.push(l)
        });
        useLignes().value = lignes
        messageToSnack("Ligne facture " + updatedLigne.numFacLigne +" mise à jour")
    })
    .catch((error) => {
        errorToSnack(error, "Erreur mise à jour ligne facture")
    })
}

/**
 * Delete the Ligne with the given id and set state
 */
export const deleteStateLigne = (id:string) => {
    deleteLigneDb(id).then((deletedId) => {
        let Lignes:ILigne[] = []
        useLignes().value.forEach(Ligne => {
            if (Ligne.id != deletedId)
                Lignes.push(Ligne)
        });
        useLignes().value = Lignes
        messageToSnack("Ligne supprimée")
    })
    .catch((error) => {
        errorToSnack(error, "Erreur suppression Ligne ")
    })
}

/**
 * Create the Ligne with the given Ligne data and set state
 */
export const createStateLigne = (ligne:ILigne) => {
    console.log("create Ligne:", ligne)
    createLigneDb(ligne).then((createdLigne:ILigne) => {
        useLignes().value.unshift(createdLigne)
        messageToSnack("Ligne " + createdLigne.numFacLigne +" créée")
    })
    .catch((error) => {
        errorToSnack(error, "Erreur création Ligne")
    })
}
