import type { AirtableBase } from "airtable/lib/airtable_base"

/**
 * get all Clients and set state
 */
export const getClients = () => {
    getClientsDb().then((list) => {
        useClients().value = list
    })
}
/**
 * Get all Clients from airtable
 * @returns Promise - the Clients list
 */
export const getClientsDb = () :Promise<IClient[]> => {
    return new Promise((resolve, reject) => {
        const { $airtableConfig, $db } = useNuxtApp()
        const db = $db as AirtableBase
        const config = $airtableConfig as IAtConf
        console.debug("start getClient", config.tableClient)
        const clients:IClient[] = []

        db(config.tableClient).select({
            fields: ["Name", "Délai Règlement", "Actif"],
            sort: [{ field: "Name", direction: "asc" }]
         }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {

                const client = new Client(record)
                clients.push(client)
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
            console.log("Clients found:",clients.length)
            resolve(clients)
        });
    })
}