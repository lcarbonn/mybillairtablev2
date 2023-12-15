/**
 * get all factures and set state
 */
export const getStateFactures = () => {
    getFacturesDb().then((list) => {
        useFactures().value = list
    })
}

/**
 * get the facture with the given id and set state
 */
export const getStateFacture = (id:string) => {
    getFactureDb(id).then((facture) => {
        useFacture().value = facture
        console.log("facture:", facture)
    })
    .catch((error) => {
        errorToSnack(error, "Erreur lecture facture")
    })
}

/**
 * Update the facture with the given facture data and set state
 */
export const updateStateFacture = (facture:IFacture) => {
    console.log("update facture:", facture)
    updateFactureDb(facture).then((updatedFac) => {
        useFacture().value = updatedFac
        messageToSnack("Facture " + updatedFac.numFac +" mise à jour")
    })
    .catch((error) => {
        errorToSnack(error, "Erreur mise à jour facture")
    })
}

/**
 * Delete the facture with the given id and set state
 */
export const deleteStateFacture = (id:string) => {
    deleteFactureDb(id).then((deletedId) => {
        let factures:IFacture[] = []
        useFactures().value.forEach(facture => {
            if (facture.id != deletedId)
                factures.push(facture)
        });
        useFactures().value = factures
        messageToSnack("Facture supprimée")
    })
    .catch((error) => {
        errorToSnack(error, "Erreur suppression facture")
    })
}

/**
 * Create the facture with the given facture data and set state
 */
export const createStateFacture = (facture:IFacture) => {
    console.log("create facture:", facture)
    createFactureDb(facture).then((createdFac:IFacture) => {
        useFacture().value = createdFac
        useFactures().value.unshift(createdFac)
        messageToSnack("Facture " + createdFac.numFac +" créée")
    })
    .catch((error) => {
        errorToSnack(error, "Erreur création facture")
    })
}
