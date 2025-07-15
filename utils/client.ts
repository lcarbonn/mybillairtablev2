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
     * @param record - Record form db
     */
      constructor(row:BaserowRow) {
        const {$clientConfig  } = useNuxtApp()
        const CLIENT_CONF = $clientConfig as IClientConf

        this.id = row.id.toString()
        this.name = row[CLIENT_CONF.CLIENT_NAME],
        this.paymentDelay = new Number(row[CLIENT_CONF.CLIENT_PAYMENT_DELAY]).valueOf(),
        this.actif = new Boolean(row[CLIENT_CONF.CLIENT_ACTIF]).valueOf()
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

export const getPaymentDelay = (clients:IClient[], clientName:string):number|undefined => {
  let paymentDelay = undefined
  clients.forEach(client => {
    if(client.name == clientName) {
      paymentDelay = client.paymentDelay
    }
  })
  return paymentDelay
}