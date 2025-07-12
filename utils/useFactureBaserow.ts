import { BaserowClient } from "@watzon/baserow";

/**
 * Get all factures from database
 * @returns Promise - the factures list or the error
 */
export const getFacturesBr = async () : Promise<Facture[]> => {
  return new Promise((resolve, reject) => {
    const { $baserow, $baserowConfig  } = useNuxtApp()
    const client = $baserow as BaserowClient
    const config = $baserowConfig as IBrConf
    client.databaseRows.list(
    config.tableFacture,
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
      const { $baserow, $baserowConfig  } = useNuxtApp()
      const client = $baserow as BaserowClient
      const config = $baserowConfig as IBrConf
      client.databaseRows.get(config.tableFacture, Number(id))
      .then((row) => {
        const fac = new Facture(row)
        resolve(fac)
      })
      .catch((error) => {
        console.error("getFactureBr", error)
        reject(error)
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
      const { $baserow, $baserowConfig  } = useNuxtApp()
      const client = $baserow as BaserowClient
      const config = $baserowConfig as IBrConf
      client.databaseRows.update(config.tableFacture, Number(facture.id), 
      {
            field_4196477: facture.date? facture.date.toISOString().substring(0,10):null,
            field_4171430: facture.num,
            field_4171438: facture.comment,
            field_4171437: facture.tva?facture.tva*100:20,
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
      .catch((error) => {
        console.error("updateFactureBr", error)
        reject(error)
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
      const { $baserow, $baserowConfig  } = useNuxtApp()
      const client = $baserow as BaserowClient
      const config = $baserowConfig as IBrConf
      client.databaseRows.create(config.tableFacture, 
      {
            field_4196477: facture.date? facture.date.toISOString().substring(0,10):null,
            field_4171430: facture.num,
            field_4171438: facture.comment,
            field_4171437: facture.tva?facture.tva*100:20,
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
      .catch((error) => {
        console.error("createFactureBr", error)
        reject(error)
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
      const { $baserow, $baserowConfig  } = useNuxtApp()
      const client = $baserow as BaserowClient
      const config = $baserowConfig as IBrConf
      const idnum = new Number(id).valueOf()
      client.databaseRows.delete(config.tableFacture, idnum)
      .then(() => {
        resolve(id)
      })
      .catch((error) => {
        console.error("deleteFactureBr", error)
        reject(error)
      })
    })
}