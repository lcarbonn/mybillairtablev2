import type { AirtableBase } from "airtable/lib/airtable_base"

/**
 * Get all CA from airtable
 * @returns Promise - the CA list
 */
export const getCasDb = () :Promise<ICa[]> => {
    return new Promise((resolve, reject) => {
        const { $airtableConfig, $db } = useNuxtApp()
        const db = $db as AirtableBase
        const config = $airtableConfig as IAtConf
        console.debug("start getCas", config.tableCa)
        const cas:ICa[] = []

        db(config.tableCa).select({
            fields: ["Date", "Année CA"],
            sort: [{ field: "Date", direction: "desc" }]
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {

                const ca = new Ca(record)
                cas.push(ca)
            });
            fetchNextPage();
        }, function done(err) {
            if (err) {
                console.error(err);
                reject(err)
            }
            else resolve(cas)
        });
    })
}