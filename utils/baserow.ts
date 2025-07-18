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

/**
 * Type Baserow CA config
 */
export type ICaConf = {
    CA_DATE:string
    CA_YEAR:string
}

/**
 * Type Baserow Ligne config
 */
export type ILigneConf = {
    LIGNE_NUMFACLIGNE:string
    LIGNE_NUMFAC:string
    LIGNE_LIGNE:string
    LIGNE_LIBELLE:string
    LIGNE_PUHT:string
    LIGNE_TYPEPU:string
    LIGNE_QUANTITE:string
    LIGNE_TOTALHT:string
}
