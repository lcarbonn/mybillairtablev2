import type { AirtableBase } from "airtable/lib/airtable_base"

/**
 * Get all Lignes from airtable for the given facture numFac
 * @param numFac - the facture numFac
 * @returns Promise - the Lignes list or the error
 */
export const getLignesDb = (numFac:string) :Promise<ILigne[]> => {
    return new Promise((resolve, reject) => {
        const { $airtableConfig, $db } = useNuxtApp()
        const db = $db as AirtableBase
        const config = $airtableConfig as IAtConf
        console.debug("start getLignes", config.tableLigneFacture, ' id:', numFac)
        const lignes:ILigne[] = []

        db(config.tableLigneFacture).select({
                fields: ['#NumFacLigne', '#Ligne', "Libellé", 'PU HT', 'PU/H', '#NumFac', "Quantité", "Total HT"],
                sort: [{ field: "#Ligne", direction: "asc" }],
                filterByFormula: "{#NumFac} = '"+numFac+"'"
            }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {

                const ligne = new Ligne(record)
                lignes.push(ligne)
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { 
                console.error(err); 
                reject(err)
            } else {
                console.debug("end getLignes", lignes.length)
                resolve(lignes)
            }
        });
    })
}

// /**
//  * Get the Ligne with the given id from db
//  * @param id - the Ligne id
//  * @returns a Promise with the Ligne from db or the error
//  */
// export const getLigneDb = (id:string) :Promise<ILigne> => {
//     return new Promise((resolve, reject) => {
//         const { $airtableConfig, $db } = useNuxtApp()
//         const db = $db as AirtableBase
//         const config = $airtableConfig as IAtConf
     
//         db(config.tableLigneFacture).find(id, function(err, record) {
//             if (err) { 
//                 console.error(err);
//                 reject(err)
//             }
//             if(record) {
//                 const Ligne = new Ligne(record)
//                 resolve(Ligne)
//             }
//         });
//     })
// }

// /**
//  * Update the Ligne in the db
//  * @param Ligne Update the Ligne in db
//  * @returns a Promise with the updated Ligne from db or the error
//  */
// export const updateLigneDb = (Ligne:ILigne) :Promise<ILigne> => {
//     return new Promise((resolve, reject) => {
//         const { $airtableConfig, $db } = useNuxtApp()
//         const db = $db as AirtableBase
//         const config = $airtableConfig as IAtConf
//         db(config.tableLigneFacture).update(Ligne.id,
//             {
//             "Date": Ligne.date?.toDateString(),
//             "#Num": Ligne.num,
//             "Comment": Ligne.comment,
//             "Taux TVA": Ligne.tva,
//             "Statut": Ligne.statut,
//             'Client': Ligne.client? [Ligne.client]:undefined,
//             "CA": Ligne.ca?[Ligne.ca]:undefined,
//             "Bon de Commande": Ligne.bdc,
//             "Date Paiement": Ligne.payDate?.toDateString()
//             }, function(err, record) {
//                 if (err) {
//                     console.error(err);
//                     reject(err)
//                     }
//                 if(record) {
//                     const Ligne = new Ligne(record)
//                     resolve(Ligne)
//                 }
//             })
//     })
// }

// /**
//  * Delete the Ligne in the db
//  * @param id the Ligne id 
//  * @returns a Promise witn the deleted id
//  */
// export const deleteLigneDb = (id:string) :Promise<string> => {
//     return new Promise((resolve, reject) => {
//         const { $airtableConfig, $db } = useNuxtApp()
//         const db = $db as AirtableBase
//         const config = $airtableConfig as IAtConf
//         db(config.tableLigneFacture).destroy(id, function(err, deletedRecord) {
//             if (err) {
//                 console.error(err);
//                 reject(err)
//             }
//             if(deletedRecord) {
//                 resolve(deletedRecord.id)
//             }
//         })
//     })
// }

// /**
//  * Create the Ligne in the db
//  * @param Ligne Create the Ligne in db
//  * @returns a Promise with the created Ligne from db or the error
//  */
// export const createLigneDb = (Ligne:ILigne) :Promise<ILigne> => {
//     return new Promise((resolve, reject) => {
//         const { $airtableConfig, $db } = useNuxtApp()
//         const db = $db as AirtableBase
//         const config = $airtableConfig as IAtConf
//         db(config.tableLigneFacture).create(
//             {
//             "Date": Ligne.date?.toDateString(),
//             "#Num": Ligne.num,
//             "Comment": Ligne.comment,
//             "Taux TVA": Ligne.tva,
//             "Statut": Ligne.statut,
//             'Client': Ligne.client? [Ligne.client]:undefined,
//             "CA": Ligne.ca?[Ligne.ca]:undefined,
//             "Bon de Commande": Ligne.bdc,
//             "Date Paiement": Ligne.payDate?.toDateString()
//             }, function(err, record) {
//                 if (err) {
//                     console.error(err);
//                     reject(err)
//                 }
//                 if(record) {
//                     const Ligne = new Ligne(record)
//                     resolve(Ligne)
//                 }
//             })
//     })
// }
