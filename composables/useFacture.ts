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
export const getStateFacture = (id:string) :Promise<IFacture> => {
    return new Promise((resolve, reject) => {
        getFactureDb(id).then((facture) => {
            useFacture().value = facture
            resolve(facture)
        })
        .catch((error) => {
            errorToSnack(error, "Erreur lecture facture")
            reject(error)
        })
    })
}

/**
 * Update the facture with the given facture data and set state
 */
export const updateStateFacture = (facture:IFacture) :Promise<IFacture> => {
    return new Promise((resolve, reject) => {
        updateFactureDb(facture).then((updatedFac) => {
            useFacture().value = updatedFac
            messageToSnack("Facture " + updatedFac.numFac +" mise à jour")
            resolve(updatedFac)
        })
        .catch((error) => {
            errorToSnack(error, "Erreur mise à jour facture")
            reject(error)
        })
    })
}

/**
 * Delete the facture with the given id and set state
 */
export const deleteStateFacture = (facture:IFacture) => {
    // delete lignes
    deleteFactureLignes(facture.numFac).then(() => {
        // delete facture
        deleteFactureDb(facture.id).then((deletedId) => {
            let factures:IFacture[] = []
            useFactures().value.forEach(facture => {
                if (facture.id != deletedId)
                    factures.push(facture)
            });
            useFactures().value = factures
            messageToSnack("Facture et lignes supprimées")
        })
        .catch((error) => {
            errorToSnack(error, "Erreur suppression facture")
        })
    })
    .catch((error) => {
        errorToSnack(error, "Erreur suppression lignes facture")
    })
}

/**
 * Create the facture with the given facture data and set state
 */
export const createStateFacture = (facture:IFacture) :Promise<IFacture> => {
    return new Promise((resolve, reject) => {
        createFactureDb(facture).then((createdFac:IFacture) => {
            useFacture().value = createdFac
            messageToSnack("Facture " + createdFac.numFac +" créée")
            resolve(createdFac)
        })
        .catch((error) => {
            errorToSnack(error, "Erreur création facture")
            reject(error)
        })
    })
}

/**
 * Copy old fature to new facture and associated lignes adn set state
 * @param newFacture - the new facture
 * @param oldFacture - the old facture
 */
export const copyStateFacture = (newFacture:IFacture, oldFacture:IFacture) => {
    createFactureDb(newFacture).then((createdFac:IFacture) => {
        useFacture().value = createdFac
        useFactures().value.unshift(createdFac)
        copyFactureLignes(createdFac.id, oldFacture.numFac).then(() => {
            messageToSnack("Facture " + createdFac.numFac +" créée")
        })
        .catch((error) => {
            errorToSnack(error, "Erreur copie lignes facture")
        })
    })
    .catch((error) => {
        errorToSnack(error, "Erreur copie facture")
    })
}
