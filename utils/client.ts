import type { Record, FieldSet } from "airtable"
import type { IOptions } from "./options"
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
     * Card constructor
     * @param record - Record form Airtable
     */
       constructor(record:Record<FieldSet>) {
        this.name = record.get('Name') as string
        this.paymentDelay = record.get('Délai Règlement') as number
        this.actif = record.get('Actif') as boolean
        this.id = record.getId()
       }
}

/**
 * Get all clients as options for select
 * @param clients 
 * @returns options for select
 */
export const getClientsOptions = (clients:IClient[]):ISupOptions[] => {
  const cliopts:ISupOptions[] = []
  const actifCliOpts:IOptions[] = []
  const inactifCliOpts:IOptions[] = []
  if(clients) clients.forEach(client => {
    if(client.actif) {
      actifCliOpts.push(
        { value: client.id, text: client.name }
      )
    } else {
      inactifCliOpts.push(
        { value: client.id, text: client.name }
      )
    }
  })
  cliopts.push(
    { label: 'Clients actifs', options: actifCliOpts}
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