import type { Record, FieldSet } from "airtable"

export type IClient = {
    name: string,
    paymentDelay:string,
    actif:boolean,
    id: string,
}

export class Client implements IClient {
  name: string
  paymentDelay:string
  actif:boolean
  id: string

       /**
     * Card constructor
     * @param record - Record form Airtable
     */
       constructor(record:Record<FieldSet>) {
        this.name = record.get('Name') as string
        this.paymentDelay = record.get('Délai Règlement') as string
        this.actif = record.get('Actif') as boolean
        this.id = record.getId()
       }
}

export const getClientsOptions = (clients:IClient[]) => {
  const cliopts = []
  const actifCliOpts:{value:string, text:string}[] = []
  const inactifCliOpts:{value:string, text:string}[] = []
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
