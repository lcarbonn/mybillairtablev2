import { BaserowClient } from "@watzon/baserow";

const FACTURE_TABLE_ID = 524380

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
    console.log(`Retrieved ${rows.count} rows`);
    console.log(rows.results);
    const factures:IFacture[] = []
    rows.results.forEach(row => {
      const fac = new Facture()
      fac.id = row.id.toString()
      fac.numFac = row["field_4171429"]
      fac.date = new Date(row["field_4196477"])
      fac.num = row['field_4171430']
      fac.comment = row['field_4171438']
      const client = row['field_4171431'][0]
      fac.client = client?client.value:undefined
      const statut = row['field_4171432']
      fac.statut = statut?statut.value:undefined
      fac.totalHT = row['field_4172036']
      fac.totalTTC = row['field_4277086']
      const ca = row['field_4171436'][0]
      fac.ca = ca?ca.value:undefined
      fac.tva = row['field_4277079']
      const dlp = row['field_4174240'][0]
      fac.paymentDelay = dlp?dlp.value:undefined
      fac.bdc = row['field_4171439']
      fac.payDate = row['field_4171433'] ? new Date(row['field_4171433']) : undefined
      const anca = row['field_4668726'][0]
      fac.anneeCa = anca?anca.value:undefined
        factures.push(fac)
    });
    resolve(factures)
    })
  })
}