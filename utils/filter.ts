import type { ICa } from "./ca"
import type { IFacture } from "./facture"

/**
 * Filter type
 */
export type IFilter = {
    ca: string|undefined,
    search:string|undefined,
    client:string|undefined,
    statut:string|undefined,
    date:number|undefined
}

/**
 * Filter class
 */
export class Filter implements IFilter {
  ca: string|undefined
  search:string|undefined
  client:string|undefined
  statut:string|undefined
  date:number|undefined

    // /**
    //  * Card constructor
    //  * @param ca
    //  */
    //    constructor(ca:string, search:string, client:string) {
    //     this.ca = ca
    //     this.search = search
    //     this.client = client
    //    }
}

/**
 * The filtering function
 * @param factures - list of factures
 * @param cas - liste of CAs
 * @param filter - the filter
 * @returns the filtered list of factures
 */
export const filterFunction = (factures:IFacture[], cas:ICa[], filter:IFilter) : IFacture[] => {
  console.debug("filtering")
  const filteredFactures:IFacture[] = []
  factures.forEach((facture) => {
    if(isFiltered(facture, cas, filter)) {
      filteredFactures.push(facture)
    }
  })
  return filteredFactures
}

/**
 * Is the facture filtered
 * @param facture The facture
 * @param cas - the list of CAs
 * @param filter - The filter
 * @returns true if facture meet the filter, otherwise false
 */
const isFiltered = (facture:IFacture, cas:ICa[], filter:IFilter) :boolean => {
  const isDate=!filter.date||(facture.date && filter.date && facture.date.getFullYear()==filter.date)?true:false
  const isClient=!filter.client||(facture.client && filter.client && facture.client==filter.client)?true:false
  const isSearch=!filter.search||(facture.comment && filter.search && facture.comment.toLowerCase().indexOf(filter.search.toLowerCase())!=-1)?true:false
  const isstatut=!filter.statut||(facture.statut && filter.statut && facture.statut==filter.statut)?true:false
  let caName = ""
  if(filter.ca && facture.ca) {
    caName = getCaName(facture.ca, cas)
  }
  const isCA=!filter.ca||(facture.ca && filter.ca && caName.toLowerCase().startsWith(filter.ca))?true:false
  const isFiltered=isDate&&isClient&&isSearch&&isstatut&&isCA
  return isFiltered
}
