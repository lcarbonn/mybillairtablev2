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
}

export const resetStatedFilter = () => {
  useFilter().value.ca = undefined
  useFilter().value.client = undefined
  useFilter().value.date = undefined
  useFilter().value.search = undefined
  useFilter().value.statut = undefined
}

/**
 * The filtering function
 * @param factures - list of factures
 * @param cas - liste of CAs
 * @param filter - the filter
 * @returns the filtered list of factures
 */
export const filterFunction = (factures:IFacture[], filter:IFilter) : IFacture[] => {
  const filteredFactures:IFacture[] = []
  factures.forEach((facture) => {
    if(isFiltered(facture, filter)) {
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
const isFiltered = (facture:IFacture, filter:IFilter) :boolean => {
  const isDate=!filter.date||(facture.date && filter.date && facture.date.getFullYear()==filter.date)?true:false
  const isClient=!filter.client||(facture.client && filter.client && facture.client==filter.client)?true:false
  const isSearch=!filter.search||(facture.comment && filter.search && facture.comment.toLowerCase().indexOf(filter.search.toLowerCase())!=-1)?true:false
  const isStatut=!filter.statut||(facture.statut && filter.statut && facture.statut==filter.statut)?true:false
  const isCA=!filter.ca||(facture.anneeCa && filter.ca && facture.anneeCa==filter.ca)?true:false
  const isFiltered=isDate&&isClient&&isSearch&&isStatut&&isCA
  return isFiltered
}
