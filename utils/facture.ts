import type { Record, FieldSet } from "airtable"

/**
 * Type for Facture table
 */
export type IFacture = {
    numFac: string,
    date: Date|undefined,
    index: string,
    num: string,
    comment: string,
    client: string|undefined,
    statut: string,
    totalHT: string,
    totalTTC: string,
    ca: string|undefined,
    tva: string,
    paymentDelay: string|undefined,
    bdc: string,
    payDate: Date|undefined,
    id: string,
    anneeCa:string
}

/**
 * Class for Facture table
 */
export class Facture implements IFacture {
    numFac: string
    date: Date|undefined
    index: string
    num: string
    comment: string
    client: string|undefined
    statut: string
    totalHT: string
    totalTTC: string
    ca: string|undefined
    tva: string
    paymentDelay: string|undefined
    bdc: string
    payDate: Date|undefined
    id: string
    anneeCa:string

       /**
     * Card constructor
     * @param record - Record form Airtable
     */
       constructor(record:Record<FieldSet>) {
        const client:any = record.get('Client')
        const ca:any = record.get('CA')
        const dr:any = record.get("Délai règlement")
        const newDate:any = record.get('Date')
        const payDate:any = record.get('Date Paiement')
        this.numFac = record.get('#NumFac') as string
        this.date = newDate ? new Date(newDate):undefined
        this.index = record.get('Index') as string
        this.num = record.get('#Num') as string
        this.comment = record.get('Comment') as string
        this.client = client?client[0]:undefined
        this.statut = record.get('Statut') as string
        this.totalHT = record.get('Total HT') as string
        this.totalTTC = record.get('Total TTC') as string
        this.ca = ca ? ca[0] : undefined
        this.tva = record.get('Taux TVA') as string
        this.paymentDelay = dr ? dr[0] : undefined
        this.bdc = record.get('Bon de Commande') as string
        this.payDate = payDate ? new Date(payDate) : undefined
        this.anneeCa = record.get('Année CA') as string
        this.id = record.getId()
       }
}
