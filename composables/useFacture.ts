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
    })
}

/**
 * Update the facture with the given facture data and set state
 */
export const updateStateFacture = (facture:IFacture) => {
    updateFactureDb(facture).then((updatedFac) => {
        useFacture().value = updatedFac
        messageToSnack("Facture " + facture.numFac +" mise à jour")
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
}
