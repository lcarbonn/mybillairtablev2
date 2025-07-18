import type { BaserowRow } from "@watzon/baserow"

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
     * @param record - Record form DB
     */
      constructor(row?:BaserowRow) {
        const { $factureConfig  } = useNuxtApp()
        const facConf = $factureConfig as IFactureConf

        if(row) {
          this.id = row.id.toString()
          this.numFac = row[facConf.FACTURE_NUMFAC]
          this.date = new Date(row[facConf.FACTURE_DATE])
          this.index = row[facConf.FACTURE_INDEX]
          this.num = row[facConf.FACTURE_NUM]
          this.comment = row[facConf.FACTURE_COMMENT]
          const client = row[facConf.FACTURE_CLIENT][0]
          this.client = client?client.value:undefined
          const statut = row[facConf.FACTURE_STATUT]
          this.statut = statut?statut.value:undefined
          this.totalHT = row[facConf.FACTURE_TOTALHT]
          this.totalTTC = row[facConf.FACTURE_TOTALTTC]
          const ca = row[facConf.FACTURE_CA][0]
          this.ca = ca?ca.value:undefined
          this.tva = new Number(row[facConf.FACTURE_TVA]).valueOf()/100
          const dlp = row[facConf.FACTURE_PAYMENT_DELAY][0]
          this.paymentDelay = dlp?dlp.value:undefined
          this.bdc = row[facConf.FACTURE_BDC]
          this.payDate = row[facConf.FACTURE_PAYDATE] ? new Date(row[facConf.FACTURE_PAYDATE]) : undefined
          const anca = row[facConf.FACTURE_ANNEECA][0]
          this.anneeCa = anca?anca.value:undefined
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

export const formatDate = (date:Date):string => {
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

export const setFactureCA = (facture:IFacture, caOpts:IOption[]) => {
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

export const duplicateFacture = (date:Date, selectedFacture:IFacture, factures:IFacture[], caOpts:IOption[]) : IFacture => {
  //get old facture
  const oldFacture = selectedFacture
  const newFacture = new Facture()
  newFacture.date = date,
  newFacture.comment = "DUPLICATE " + oldFacture.comment ,
  newFacture.client = oldFacture.client,
  newFacture.tva = oldFacture.tva,
  newFacture.paymentDelay = oldFacture.paymentDelay,
  newFacture.bdc = oldFacture.bdc,
  setFactureCA(newFacture, caOpts)
  setFactureNums(newFacture, date)
  const num = getMaxNum(factures, newFacture)
  setFactureNums(newFacture, undefined, num)
  return newFacture 
}
