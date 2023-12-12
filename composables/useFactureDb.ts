import type { AirtableBase } from "airtable/lib/airtable_base"

/**
 * get all factures and set state
 */
export const getFactures = () => {
    getFacturesDb().then((list) => {
        useFactures().value = list
    })
}
/**
 * Get all factures from airtable
 * @returns Promise - the factures list
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
             'Date', 'Date Paiement', 'Délai règlement', 'Taux TVA', 'Bon de Commande'],
            sort: [{ field: "#NumFac", direction: "desc" }]
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {

                const facture = new Facture(record)
                factures.push(facture)
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
            resolve(factures)
        });
    })
}