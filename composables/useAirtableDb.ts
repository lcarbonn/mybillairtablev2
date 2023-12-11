import Airtable from "airtable"
import type { AirtableBase } from "airtable/lib/airtable_base"

/**
 * 
 */
export const getFactures = () => {
    getFacturesDb().then((list) => {
        useFactures().value = list
    })
}
/**
 * Get all factures
 */
export const getFacturesDb = () :Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const { $airtableConfig, $db } = useNuxtApp()
        const db = $db as AirtableBase
        const config = $airtableConfig as IAtConf
        console.debug("start getFactures", config.tableFacture)
        const factures:any[] = []

        db('Facture').select({
            fields: ["#NumFac", "Index", "#Num",  "Statut", 'Total HT', 'Total TTC', 'Comment', 'Client', 'CA', 'Date', 'Date Paiement', 'Délai règlement', 'Taux TVA', 'Bon de Commande'],
            sort: [{ field: "#NumFac", direction: "desc" }]
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                console.log('Retrieved', record.get('#NumFac'));
                factures.push(record.get('#NumFac'))
            });
        
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
            resolve(factures)
        });
    })
}