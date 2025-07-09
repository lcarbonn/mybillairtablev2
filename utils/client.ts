import type { BaserowRow } from "@watzon/baserow"

/**
 * Type for Client table
 */
export type IClient = {
    name: string,
    paymentDelay:number,
    actif:boolean,
    id: string,
}

/**
 * Class for Client table
 */
export class Client implements IClient {
  name: string
  paymentDelay:number
  actif:boolean
  id: string

 
    /**
     * Client constructor
     * @param record - Record form Airtable
     */
      constructor(row:BaserowRow) {
        this.id = row.id.toString()
        this.name = row["field_4171418"],
        this.paymentDelay = new Number(row["field_4171424"]).valueOf(),
        this.actif = new Boolean(row["field_4171428"]).valueOf()
      }
}

/**
 * Get all clients as options for select
 * @param clients 
 * @returns options for select
 */
export const getClientsOptions = (clients:IClient[]):IOptions[] => {
  const cliopts:IOptions[] = []
  const actifCliOpt:IOption[] = []
  const inactifCliOpts:IOption[] = []
  if(clients) clients.forEach(client => {
    if(client.actif) {
      actifCliOpt.push(
        { value: client.name, text: client.name }
      )
    } else {
      inactifCliOpts.push(
        { value: client.name, text: client.name }
      )
    }
  })
  cliopts.push(
    { label: 'Clients actifs', options: actifCliOpt}
  )
  cliopts.push(
    { label: 'Clients inactifs', options: inactifCliOpts}
  )
  return cliopts
}

export const getPaymentDelay = (clients:IClient[], clientId:string):number|undefined => {
  let paymentDelay = undefined
  clients.forEach(client => {
    if(client.id == clientId) {
      paymentDelay = client.paymentDelay
    }
  })
  return paymentDelay
}