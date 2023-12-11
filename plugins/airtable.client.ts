import Airtable from 'airtable'

export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig()
    const airtableConfig:IAtConf = {
        apiKey:config.public.AIRTABLE_API_KEY,
        baseName:config.public.AIRTABLE_BASE_NAME,
        baseId:config.public.AIRTABLE_BASE_ID,
        tableFacture:config.public.AIRTABLE_FACTURE,
        tableLigneFacture:config.public.AIRTABLE_LIGNE_FACTURE,
        tableClient:config.public.AIRTABLE_CLIENT,
        tableCa:config.public.AIRTABLE_CA
    }

    const db = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseId);

    nuxtApp.provide("db", db)
    nuxtApp.vueApp.provide("db", db)

    nuxtApp.provide("airtableConfig", airtableConfig)
    nuxtApp.vueApp.provide("airtableConfig", airtableConfig)

})