import { BaserowClient } from "@watzon/baserow";

const FACTURE_TABLE_ID = 524380

/**
 * Get all factures from database
 * @returns Promise - the factures list or the error
 */
export const getFacturesBr = async () : Promise<Facture[]> => {
  return new Promise((resolve, reject) => {
    const { $baserow } = useNuxtApp()
    const client = $baserow as BaserowClient
    client.databaseRows.list(
      FACTURE_TABLE_ID,
      {
        page:1,
        size:200,
        orderBy:"-field_4171429"
      }
    ).then((rows) => {
    const factures:IFacture[] = []
    rows.results.forEach(row => {
        const fac = new Facture(row)
        factures.push(fac)
       });
    resolve(factures)
    })
  })
}

/**
 * Get the facture with the given id from db
 * @param id - the facture id
 * @returns a Promise with the facture from db or the error
 */
export const getFactureBr = (id:string) :Promise<IFacture> => {
    return new Promise((resolve, reject) => {
      const { $baserow } = useNuxtApp()
      const client = $baserow as BaserowClient
      client.databaseRows.get(FACTURE_TABLE_ID, Number(id))
      .then((row) => {
        const fac = new Facture(row)
        resolve(fac)
    })
    })
}

/**
 * Update the facture in the db
 * @param facture Update the facture in db
 * @returns a Promise with the updated facture from db or the error
 */
export const updateFactureBr = (facture:IFacture) :Promise<IFacture> => {
      return new Promise((resolve, reject) => {
      const { $baserow } = useNuxtApp()
      const client = $baserow as BaserowClient
      client.databaseRows.update(FACTURE_TABLE_ID, Number(facture.id), 
      {
            field_4196477: facture.date? facture.date.toISOString().substring(0,10):null,
            field_4171430: facture.num,
            field_4171438: facture.comment,
            field_4171437: facture.tva,
            field_4171432: facture.statut,
            field_4171439: facture.bdc,
            field_4171433: facture.payDate? facture.payDate.toISOString().substring(0,10):null,
            field_4171431: facture.client? [facture.client]:[],
            field_4171436: facture.ca?[facture.ca]:[],
      })
      .then((row) => {
        const fac = new Facture(row)
        resolve(fac)
      })
    })
}

/**
 * Create the facture in the db
 * @param facture Create the facture in db
 * @returns a Promise with the created facture from db or the error
 */
export const createFactureBr = (facture:IFacture) :Promise<IFacture> => {
    return new Promise((resolve, reject) => {
      const { $baserow } = useNuxtApp()
      const client = $baserow as BaserowClient
      client.databaseRows.create(FACTURE_TABLE_ID, 
      {
            field_4196477: facture.date? facture.date.toISOString().substring(0,10):null,
            field_4171430: facture.num,
            field_4171438: facture.comment,
            field_4171437: facture.tva,
            field_4171432: facture.statut,
            field_4171439: facture.bdc,
            field_4171433: facture.payDate? facture.payDate.toISOString().substring(0,10):null,
            field_4171431: facture.client? [facture.client]:[],
            field_4171436: facture.ca?[facture.ca]:[],
      })
      .then((row) => {
        const fac = new Facture(row)
        resolve(fac)
      })
    })
}

/**
 * Delete the facture in the db
 * @param id the facture id 
 * @returns a Promise witn the deleted id
 */
export const deleteFactureBr = (id:string) :Promise<string> => {
    return new Promise((resolve, reject) => {
      const { $baserow } = useNuxtApp()
      const client = $baserow as BaserowClient
      const idnum = new Number(id).valueOf()
      client.databaseRows.delete(FACTURE_TABLE_ID, idnum)
      .then(() => {
        resolve(id)
      })
    })
}