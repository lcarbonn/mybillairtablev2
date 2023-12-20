import Airtable from 'airtable'

export default defineNuxtPlugin((nuxtApp) => {

    // const config = useRuntimeConfig()
    const airtableConfig:IAtConf = {
        apiKey:import.meta.env.VITE_AIRTABLE_API_KEY,
        baseName:import.meta.env.VITE_AIRTABLE_BASE_NAME,
        baseId:import.meta.env.VITE_AIRTABLE_BASE_ID,
        tableFacture:import.meta.env.VITE_AIRTABLE_FACTURE,
        tableLigneFacture:import.meta.env.VITE_AIRTABLE_LIGNE_FACTURE,
        tableClient:import.meta.env.VITE_AIRTABLE_CLIENT,
        tableCa:import.meta.env.VITE_AIRTABLE_CA
    }
        
    const db = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseId);

    nuxtApp.provide("db", db)
    nuxtApp.vueApp.provide("db", db)

    nuxtApp.provide("airtableConfig", airtableConfig)
    nuxtApp.vueApp.provide("airtableConfig", airtableConfig)

})
