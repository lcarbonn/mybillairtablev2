import type { Record, FieldSet } from "airtable"

/**
 * Type for Facture table
 */
export type IFacture = {
    numFac: string,
    date: Date|undefined,
    index: string|undefined,
    num: string|undefined,
    comment: string|undefined,
    client: string|undefined,
    statut: string|undefined
    totalHT: number|undefined,
    totalTTC: number|undefined,
    ca: string|undefined,
    tva: number|undefined,
    paymentDelay: number|undefined,
    bdc: string|undefined,
    payDate: Date|undefined,
    id: string,
    anneeCa:string|undefined
}

/**
 * Class for Facture table
 */
export class Facture implements IFacture {
    numFac: string
    date: Date|undefined
    index: string|undefined
    num: string|undefined
    comment: string|undefined
    client: string|undefined
    statut: string|undefined
    totalHT: number|undefined
    totalTTC: number|undefined
    ca: string|undefined
    tva: number|undefined
    paymentDelay: number|undefined
    bdc: string|undefined
    payDate: Date|undefined
    id: string
    anneeCa:string|undefined
    
    /**
     * Facture constructor
     * @param record - Record form Airtable
     */
       constructor(record?:Record<FieldSet>) {
        if(record) {
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
          this.totalHT = record.get('Total HT') as number
          this.totalTTC = record.get('Total TTC') as number
          this.ca = ca ? ca[0] : undefined
          this.tva = record.get('Taux TVA') as number
          this.paymentDelay = dr ? dr[0] : undefined
          this.bdc = record.get('Bon de Commande') as string
          this.payDate = payDate ? new Date(payDate) : undefined
          this.anneeCa = record.get('Année CA') as string
          this.id = record.getId()
        }
        else {
          this.id=""
          this.numFac = ""
          this.tva = 0.2
        }
       }
}


export const padTo2Digits = (num:string):string => {
  return num.toString().padStart(2, "0")
}

export const formatDate = (date:Date) => {
  let newDate = new Date(date)
  return [
    newDate.getFullYear(),
    padTo2Digits(String(newDate.getMonth() + 1)),
  ].join('-');
}

export const setFactureNums = (facture:IFacture, date?:Date, num?:string) => {
  if(date) {
    facture.date = new Date(date)
    facture.index = formatDate(new Date(date))
  }
  if(num)  {
    facture.num = padTo2Digits(num)
  }
  facture.numFac = facture.index + "-"+ facture.num
}

export const getMaxNum = (factures:IFacture[]|undefined, newFacture:IFacture) :string => {
  let maxNum = 0
  if(newFacture.index && factures && factures.length>0) {
    factures.forEach(facture => {
      if(facture.index==newFacture.index && newFacture.id!=facture.id && Number(facture.num)>maxNum) maxNum = new Number(facture.num).valueOf()
    });
  }
  return padTo2Digits(String(++maxNum))
}

export const setFactureCA = (facture:IFacture, caOpts:IOptions[]) => {
  let caFac = undefined
  if(facture.date && caOpts) {
    const newDate = new Date(facture.date)
    let year = newDate.getFullYear()
    let month = newDate.getMonth()+1
    if(facture.paymentDelay){
      month=month+(facture.paymentDelay/30)
    } else {
      month++
    }
    if (month > 12) {
      month = month - 12
      year++
    }
    let ca = year + "-" + month;
    if(month<10) {
      ca = year + "-0" + month;
    }
    caOpts.forEach(caOpt => {
      if(caOpt.text == ca) caFac = caOpt.value
    });
  }
  facture.ca = caFac
}
