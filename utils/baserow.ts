/**
 * Type Baserow config
 */
export type IBrConf = {
    url:string,
    baseName:string,
    token:string,
    baseId: string,
    tableFacture: number,
    tableLigneFacture: number,
    tableClient: number,
    tableCa: number
}

/**
 * Type Baserow Facture config
 */
export type IFactureConf = {
    FACTURE_NUMFAC:string
    FACTURE_DATE:string
    FACTURE_INDEX:string
    FACTURE_NUM:string
    FACTURE_COMMENT:string
    FACTURE_CLIENT:string
    FACTURE_STATUT:string
    FACTURE_TOTALHT:string
    FACTURE_TOTALTTC:string
    FACTURE_CA:string
    FACTURE_TVA:string
    FACTURE_PAYMENT_DELAY:string
    FACTURE_BDC:string
    FACTURE_PAYDATE:string
    FACTURE_ANNEECA:string
}

/**
 * Type Baserow Client config
 */
export type IClientConf = {
    CLIENT_NAME:string
    CLIENT_PAYMENT_DELAY:string
    CLIENT_ACTIF:string
}
