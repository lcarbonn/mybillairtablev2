import { BaserowClient } from "@watzon/baserow";

/**
 * Create the Ligne in the db
 * @param ligne - Create the Ligne in db
 * @returns a Promise with the created Ligne from db or the error
 */
export const createLigneBr = (ligne:ILigne) :Promise<ILigne> => {
    return new Promise((resolve, reject) => {
        const { $baserow, $baserowConfig  } = useNuxtApp()
        const client = $baserow as BaserowClient
        const config = $baserowConfig as IBrConf
      client.databaseRows.create(config.tableLigneFacture, 
      {
            field_4171447:ligne.numFac? [ligne.numFac]:[],
            field_4171446:ligne.ligne,
            field_4196569:ligne.libelle,
            field_4171443:ligne.puHT,
            field_4171445:ligne.typePU
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
        const { $baserow, $baserowConfig  } = useNuxtApp()
        const client = $baserow as BaserowClient
        const config = $baserowConfig as IBrConf
        client.databaseRows.update(config.tableLigneFacture, Number(ligne.id),
        {
            field_4171447:ligne.numFac? [ligne.numFac]:[],
            field_4171446:ligne.ligne,
            field_4196569:ligne.libelle,
            field_4171443:ligne.puHT,
            field_4171445:ligne.typePU
        })
        .then((row) => {
            const ligne = new Ligne(row)
            resolve(ligne)
        })
        .catch((error) => {
            console.error("updateLigneBr", error)
            reject(error)
        })

//         if(!ligne.id) {
//             reject("ligne id not provided")
//             return
//         }

//         const { $airtableConfig, $db } = useNuxtApp()
//         const db = $db as AirtableBase
//         const config = $airtableConfig as IAtConf
//         db(config.tableLigneFacture).update(ligne.id,
//             {
//             "#Ligne": ligne.ligne,
//             "Libellé": ligne.libelle,
//             "PU HT": ligne.puHT,
//             "PU/H": ligne.typePU,
//             }, function(err, record) {
//                 if (err) {
//                     console.error(err);
//                     reject(err)
//                     }
//                 if(record) {
//                     const ligne = new Ligne(record)
//                     resolve(ligne)
//                 }
//             }
//         )
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
        const { $baserow, $baserowConfig  } = useNuxtApp()
        const client = $baserow as BaserowClient
        const config = $baserowConfig as IBrConf
        client.databaseRows.list(
        config.tableLigneFacture,
        {
            page:1,
            size:20,
            orderBy:"field_4171446",
            filter__field_4171447__link_row_contains:numFac
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
    })
}
