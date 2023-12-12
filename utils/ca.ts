import type { Record, FieldSet } from "airtable"

export type ICa = {
    date: Date|undefined,
    year:string,
    id: string,
}

export class Ca implements ICa {
  date: Date|undefined
  year:string
  id: string

       /**
     * Card constructor
     * @param record - Record form Airtable
     */
       constructor(record:Record<FieldSet>) {
        const newDate:any = record.get('Date')
        this.date = newDate ? new Date(newDate):undefined
        this.year = record.get('Année CA') as string
        this.id = record.getId()
       }
}