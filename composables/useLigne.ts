/**
 * get all Lignes for the numFac Facture and set state
 */
export const getStateLignes = (numFac:string) => {
    getLignesBr(numFac).then((list) => {
        useLignes().value = list
    })
}

/**
 * Create the Ligne with the given Ligne data and set state
 */
export const createStateLigne = (ligne:ILigne) :Promise<ILigne> => {
    return new Promise((resolve, reject) => {
        createLigneDb(ligne).then((createdLigne:ILigne) => {
            useLignes().value.push(createdLigne)
            messageToSnack("Ligne " + createdLigne.numFacLigne +" créée")
            resolve(createdLigne)
        })
        .catch((error) => {
            errorToSnack(error, "Erreur création Ligne")
            reject(error)
        })
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
 * Delete all lignes of a facture
 * @param numFac - the numFac of teh facture
 */
export const deleteFactureLignes = (numFac:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        getLignesBr(numFac).then((list) => {
            list.forEach(ligne => {
                if(ligne.id) deleteLigneDb(ligne.id)
            });
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

/**
 * Copy lignes of the facture
 */
export const copyFactureLignes = (newFactureId:string, oldNumFac:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        getLignesBr(oldNumFac).then((list) => {
            list.forEach(ligne => {
                if(ligne) {
                    // copy ligne the create
                    const ligneCopy = new Ligne() 
                    ligneCopy.numFac = []
                    ligneCopy.numFac.push(newFactureId)
                    ligneCopy.ligne = ligne.ligne
                    ligneCopy.libelle = "DUPLICATE " + ligne.libelle
                    ligneCopy.puHT = ligne.puHT
                    ligneCopy.typePU = ligne.typePU
                    createLigneDb(ligneCopy)
                }
            });
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}
