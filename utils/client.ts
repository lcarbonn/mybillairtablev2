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
