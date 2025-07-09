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

})
