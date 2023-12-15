import type { AirtableBase } from "airtable/lib/airtable_base"

/**
 * Get all factures from airtable
 * @returns Promise - the factures list or the error
 */
export const getFacturesDb = () :Promise<IFacture[]> => {
    return new Promise((resolve, reject) => {
        const { $airtableConfig, $db } = useNuxtApp()
        const db = $db as AirtableBase
        const config = $airtableConfig as IAtConf
        console.debug("start getFactures", config.tableFacture)
        const factures:IFacture[] = []

        db(config.tableFacture).select({
            fields: ["#NumFac", "Index", "#Num",  "Statut",
             'Total HT', 'Total TTC', 'Comment', 'Client', 'CA',
             'Date', 'Date Paiement', 'Délai règlement', 'Taux TVA', 'Bon de Commande', 'Année CA'],
            sort: [{ field: "#NumFac", direction: "desc" }]
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {

                const facture = new Facture(record)
                factures.push(facture)
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { 
                console.error(err); 
                reject(err)
                return; 
            }
            console.debug("end getFactures", factures.length)
            resolve(factures)
        });
    })
}

/**
 * Get the facture with the given id from db
 * @param id - the facture id
 * @returns a Promise with the facture from db or the error
 */
export const getFactureDb = (id:string) :Promise<IFacture> => {
    return new Promise((resolve, reject) => {
        const { $airtableConfig, $db } = useNuxtApp()
        const db = $db as AirtableBase
        const config = $airtableConfig as IAtConf
     
        db(config.tableFacture).find(id, function(err, record) {
            if (err) { 
                console.error(err);
                reject(err)
                return;
            }
            if(record) {
                const facture = new Facture(record)
                resolve(facture)
            }
        });
    })
}

/**
 * Update the facture in the db
 * @param facture Update the facture in db
 * @returns a Promise with the updated facture from db or the error
 */
export const updateFactureDb = (facture:IFacture) :Promise<IFacture> => {
    return new Promise((resolve, reject) => {
        const { $airtableConfig, $db } = useNuxtApp()
        const db = $db as AirtableBase
        const config = $airtableConfig as IAtConf
        db(config.tableFacture).update(facture.id,
            {
            "Date": facture.date?.toString(),
            "#Num": facture.num,
            "Comment": facture.comment,
            "Taux TVA": facture.tva,
            "Statut": facture.statut,
            'Client': facture.client? [facture.client]:undefined,
            "CA": facture.ca?[facture.ca]:undefined,
            "Bon de Commande": facture.bdc,
            "Date Paiement": facture.payDate?.toString()
            }, function(err, record) {
                if (err) {
                    console.error(err);
                    reject(err)
                    return;
                    }
                if(record) {
                    const facture = new Facture(record)
                    resolve(facture)
                }
            })
    })
}

/**
 * Delete the facture in the db
 * @param id the facture id 
 * @returns a Promise witn the deleted id
 */
export const deleteFactureDb = (id:string) :Promise<string> => {
    return new Promise((resolve, reject) => {
        const { $airtableConfig, $db } = useNuxtApp()
        const db = $db as AirtableBase
        const config = $airtableConfig as IAtConf
        db(config.tableFacture).destroy(id, function(err, deletedRecord) {
            if (err) {
                console.error(err);
                reject(err)
                return;
                }
            if(deletedRecord) {
                resolve(deletedRecord.id)
            }
        })
    })
}
