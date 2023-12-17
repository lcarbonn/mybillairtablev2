/**
 * get all Lignes for the numFac Facture and set state
 */
export const getStateLignes = (numFac:string) => {
    getLignesDb(numFac).then((list) => {
        useLignes().value = list
    })
}

// /**
//  * Delete the Ligne with the given id and set state
//  */
// export const deleteStateLigne = (id:string) => {
//     deleteLigneDb(id).then((deletedId) => {
//         let Lignes:ILigne[] = []
//         useLignes().value.forEach(Ligne => {
//             if (Ligne.id != deletedId)
//                 Lignes.push(Ligne)
//         });
//         useLignes().value = Lignes
//         messageToSnack("Ligne supprimée")
//     })
//     .catch((error) => {
//         errorToSnack(error, "Erreur suppression Ligne")
//     })
// }

// /**
//  * Create the Ligne with the given Ligne data and set state
//  */
// export const createStateLigne = (Ligne:ILigne) => {
//     console.log("create Ligne:", Ligne)
//     createLigneDb(Ligne).then((createdFac:ILigne) => {
//         useLigne().value = createdFac
//         useLignes().value.unshift(createdFac)
//         messageToSnack("Ligne " + createdFac.numFac +" créée")
//     })
//     .catch((error) => {
//         errorToSnack(error, "Erreur création Ligne")
//     })
// }
