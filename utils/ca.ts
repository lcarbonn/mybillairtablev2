import type { Record, FieldSet } from "airtable"

export type ICa = {
    date: string,
    year:string,
    id: string,
}

export class Ca implements ICa {
  date: string
  year:string
  id: string

       /**
     * Card constructor
     * @param record - Record form Airtable
     */
       constructor(record:Record<FieldSet>) {
        this.date = record.get('Date') as string
        this.year = record.get('Année CA') as string
        this.id = record.getId()
       }
}

export const getCasOptions = (cas:ICa[]) => {
  const opts:{value:string, text:string}[] = []
  const options = new Map()
  if(cas) cas.forEach(ca => {
    options.set(ca.year, ca.year)
  })
  options.forEach((value, key) => {
    opts.push({ value: key, text: value })
  })
  return opts
}
