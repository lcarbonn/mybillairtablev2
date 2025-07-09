import { BaserowClient } from "@watzon/baserow";
import { contentType } from "happy-dom/lib/PropertySymbol.js";


export default defineNuxtPlugin((nuxtApp) => {

    // Initialize the client
    const client = new BaserowClient({
        url: "https://api.baserow.io",
        token: "9xayHC7kou8WFadk9jz18erB9eVM0YMB",
        // Optional: tokenType defaults to "Token", can be "JWT" for JWT tokens
        tokenType: "Token",
        defaultHeaders:{
            "Content-Type" : "application/json",
        }
    });

    nuxtApp.provide("baserow", client)
    nuxtApp.vueApp.provide("baserow", client)

})
