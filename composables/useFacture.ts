/**
 * get all factures and set state
 */
export const getFactures = () => {
    getFacturesDb().then((list) => {
        useFactures().value = list
    })
}

/**
 * get the facture with the given id and set state
 */
export const getFacture = (id:string) => {
    getFactureDb(id).then((facture) => {
        useFacture().value = facture
    })
}
