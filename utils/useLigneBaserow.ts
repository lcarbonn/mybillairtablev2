import { BaserowClient } from "@watzon/baserow";

/**
 * Create the Ligne in the db
 * @param ligne - Create the Ligne in db
 * @returns a Promise with the created Ligne from db or the error
 */
export const createLigneBr = (ligne:ILigne) :Promise<ILigne> => {
    return new Promise((resolve, reject) => {
        const { $baserow, $baserowConfig, $ligneConfig  } = useNuxtApp()
        const client = $baserow as BaserowClient
        const config = $baserowConfig as IBrConf
        const LIGNE_CONF = $ligneConfig as ILigneConf
        client.databaseRows.create(config.tableLigneFacture, 
        {
            [LIGNE_CONF.LIGNE_NUMFAC]:ligne.numFac? [ligne.numFac]:[],
            [LIGNE_CONF.LIGNE_LIGNE]:ligne.ligne,
            [LIGNE_CONF.LIGNE_LIBELLE]:ligne.libelle,
            [LIGNE_CONF.LIGNE_PUHT]:ligne.puHT,
            [LIGNE_CONF.LIGNE_TYPEPU]:ligne.typePU
        })
        .then((row) => {
            const ligne = new Ligne(row)
            resolve(ligne)
        })
        .catch((error) => {
            console.error("createLigneBr", error)
            reject(error)
        })
    })
}

/**
 * Update the Ligne in the db
 * @param ligne Update the Ligne in db
 * @returns a Promise with the updated Ligne from db or the error
 */
export const updateLigneBr = (ligne:ILigne) :Promise<ILigne> => {
    return new Promise((resolve, reject) => {
        const { $baserow, $baserowConfig, $ligneConfig  } = useNuxtApp()
        const client = $baserow as BaserowClient
        const config = $baserowConfig as IBrConf
        const LIGNE_CONF = $ligneConfig as ILigneConf
        client.databaseRows.update(config.tableLigneFacture, Number(ligne.id),
        {
            [LIGNE_CONF.LIGNE_NUMFAC]:ligne.numFac? [ligne.numFac]:[],
            [LIGNE_CONF.LIGNE_LIGNE]:ligne.ligne,
            [LIGNE_CONF.LIGNE_LIBELLE]:ligne.libelle,
            [LIGNE_CONF.LIGNE_PUHT]:ligne.puHT,
            [LIGNE_CONF.LIGNE_TYPEPU]:ligne.typePU
        })
        .then((row) => {
            const ligne = new Ligne(row)
            resolve(ligne)
        })
        .catch((error) => {
            console.error("updateLigneBr", error)
            reject(error)
        })
    })
}

/**
 * Delete the Ligne in the db
 * @param id the Ligne id 
 * @returns a Promise witn the deleted id
 */
export const deleteLigneBr = (id:string) :Promise<string> => {
    return new Promise((resolve, reject) => {
        const { $baserow, $baserowConfig  } = useNuxtApp()
        const client = $baserow as BaserowClient
        const config = $baserowConfig as IBrConf
        const idnum = new Number(id).valueOf()
        client.databaseRows.delete(config.tableLigneFacture, idnum)
        .then(() => {
            resolve(id)
        })
        .catch((error) => {
            console.error("deleteLigneBr", error)
            reject(error)
        })
    })
}

/**
 * Get all Lignes from db for the given facture numFac
 * @param numFac - the facture numFac
 * @returns Promise - the Lignes list or the error
 */
export const getLignesBr = (numFac:string) :Promise<ILigne[]> => {
    return new Promise((resolve, reject) => {
        const { $baserow, $baserowConfig, $ligneConfig  } = useNuxtApp()
        const client = $baserow as BaserowClient
        const config = $baserowConfig as IBrConf
        const LIGNE_CONF = $ligneConfig as ILigneConf
        const filter = new String("filter__"+LIGNE_CONF.LIGNE_NUMFAC+"__link_row_contains").valueOf()
        client.databaseRows.list(
        config.tableLigneFacture,
        {
            page:1,
            size:20,
            orderBy:LIGNE_CONF.LIGNE_LIGNE,
            [filter]:numFac
            //filter__field_4171447__link_row_contains:numFac
            // the following doesn't work
            // filters: [
            //     {
            //         field: "field_4171447",
            //         type: "link_row_contains",
            //         value: numFac
            //     }
            // ]
        }
        ).then((rows) => {
            const lignes:ILigne[] = []
            rows.results.forEach(row => {
                const ligne = new Ligne(row)
                lignes.push(ligne)
                });
            resolve(lignes)
        })
        .catch((error) => {
            console.error("getLignesBr", error)
            reject(error)
        })
    })
}
