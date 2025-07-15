import { BaserowClient } from "@watzon/baserow";

/**
 * Get all factures from database
 * @returns Promise - the factures list or the error
 */
export const getFacturesBr = async () : Promise<Facture[]> => {
  return new Promise((resolve, reject) => {
    const { $baserow, $baserowConfig, $factureConfig  } = useNuxtApp()
    const client = $baserow as BaserowClient
    const config = $baserowConfig as IBrConf
    const facConf = $factureConfig as IFactureConf
    const orderBy = new String("-"+facConf.FACTURE_NUMFAC).valueOf()
    client.databaseRows.list(
    config.tableFacture,
      {
        page:1,
        size:200,
        orderBy:orderBy
      }
    ).then((rows) => {
      const factures:IFacture[] = []
      rows.results.forEach(row => {
          const fac = new Facture(row)
          factures.push(fac)
        });
      resolve(factures)
    })
    .catch((error) => {
      console.error("getFacturesBr", error)
      reject(error)
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
      const { $baserow, $baserowConfig, $factureConfig  } = useNuxtApp()
      const client = $baserow as BaserowClient
      const config = $baserowConfig as IBrConf
      const facConf = $factureConfig as IFactureConf
      client.databaseRows.update(config.tableFacture, Number(facture.id),
      {
            [facConf.FACTURE_DATE]: facture.date? facture.date.toISOString().substring(0,10):null,
            [facConf.FACTURE_NUM]: facture.num,
            [facConf.FACTURE_COMMENT]: facture.comment,
            [facConf.FACTURE_TVA]: facture.tva?facture.tva*100:20,
            [facConf.FACTURE_STATUT]: facture.statut,
            [facConf.FACTURE_BDC]: facture.bdc,
            [facConf.FACTURE_PAYDATE]: facture.payDate? facture.payDate.toISOString().substring(0,10):null,
            [facConf.FACTURE_CLIENT]: facture.client? [facture.client]:[],
            [facConf.FACTURE_CA]: facture.ca?[facture.ca]:[],
      }
      )
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
      const { $baserow, $baserowConfig, $factureConfig  } = useNuxtApp()
      const client = $baserow as BaserowClient
      const config = $baserowConfig as IBrConf
      const facConf = $factureConfig as IFactureConf
      client.databaseRows.create(config.tableFacture, 
      {
            [facConf.FACTURE_DATE]: facture.date? facture.date.toISOString().substring(0,10):null,
            [facConf.FACTURE_NUM]: facture.num,
            [facConf.FACTURE_COMMENT]: facture.comment,
            [facConf.FACTURE_TVA]: facture.tva?facture.tva*100:20,
            [facConf.FACTURE_STATUT]: facture.statut,
            [facConf.FACTURE_BDC]: facture.bdc,
            [facConf.FACTURE_PAYDATE]: facture.payDate? facture.payDate.toISOString().substring(0,10):null,
            [facConf.FACTURE_CLIENT]: facture.client? [facture.client]:[],
            [facConf.FACTURE_CA]: facture.ca?[facture.ca]:[],
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