import { BaserowClient } from "@watzon/baserow";

export default defineNuxtPlugin((nuxtApp) => {

    const baserowConfig:IBrConf = {
        url:import.meta.env.VITE_BASEROW_URL,
        baseName:import.meta.env.VITE_BASEROW_BASE_NAME,
        token:import.meta.env.VITE_BASEROW_TOKEN,
        baseId:import.meta.env.VITE_BASEROW_BASE_ID,
        tableFacture:import.meta.env.VITE_BASEROW_FACTURE,
        tableLigneFacture:import.meta.env.VITE_BASEROW_LIGNE_FACTURE,
        tableClient:import.meta.env.VITE_BASEROW_CLIENT,
        tableCa:import.meta.env.VITE_BASEROW_CA
    }

    const factureConfig:IFactureConf = {
        FACTURE_NUMFAC:import.meta.env.VITE_BASEROW_FACTURE_NUMFAC,
        FACTURE_DATE:import.meta.env.VITE_BASEROW_FACTURE_DATE,
        FACTURE_INDEX:import.meta.env.VITE_BASEROW_FACTURE_INDEX,
        FACTURE_NUM:import.meta.env.VITE_BASEROW_FACTURE_NUM,
        FACTURE_COMMENT:import.meta.env.VITE_BASEROW_FACTURE_COMMENT,
        FACTURE_CLIENT:import.meta.env.VITE_BASEROW_FACTURE_CLIENT,
        FACTURE_STATUT:import.meta.env.VITE_BASEROW_FACTURE_STATUT,
        FACTURE_TOTALHT:import.meta.env.VITE_BASEROW_FACTURE_TOTALHT,
        FACTURE_TOTALTTC:import.meta.env.VITE_BASEROW_FACTURE_TOTALTTC,
        FACTURE_CA:import.meta.env.VITE_BASEROW_FACTURE_CA,
        FACTURE_TVA:import.meta.env.VITE_BASEROW_FACTURE_TVA,
        FACTURE_PAYMENT_DELAY:import.meta.env.VITE_BASEROW_FACTURE_PAYMENT_DELAY,
        FACTURE_BDC:import.meta.env.VITE_BASEROW_FACTURE_BDC,
        FACTURE_PAYDATE:import.meta.env.VITE_BASEROW_FACTURE_PAYDATE,
        FACTURE_ANNEECA:import.meta.env.VITE_BASEROW_FACTURE_ANNEECA
    }

    const clientConfig:IClientConf = {
        CLIENT_NAME:import.meta.env.VITE_BASEROW_CLIENT_NAME,
        CLIENT_PAYMENT_DELAY:import.meta.env.VITE_BASEROW_CLIENT_PAYMENT_DELAY,
        CLIENT_ACTIF:import.meta.env.VITE_BASEROW_CLIENT_ACTIF
    }

    // Initialize the client
    const client = new BaserowClient({
        url: baserowConfig.url,
        token: baserowConfig.token,
        // Optional: tokenType defaults to "Token", can be "JWT" for JWT tokens
        tokenType: "Token",
        defaultHeaders:{
            "Content-Type" : "application/json",
        }
    });

    nuxtApp.provide("baserow", client)
    nuxtApp.vueApp.provide("baserow", client)

    nuxtApp.provide("baserowConfig", baserowConfig)
    nuxtApp.vueApp.provide("baserowConfig", baserowConfig)

    nuxtApp.provide("factureConfig", factureConfig)
    nuxtApp.vueApp.provide("factureConfig", factureConfig)

    nuxtApp.provide("clientConfig", clientConfig)
    nuxtApp.vueApp.provide("clientConfig", clientConfig)

})
