import type { Record, FieldSet } from "airtable"
import type { IOptions } from "./options"
/**
 * Type for CA table
 */
export type ICa = {
    date: string,
    year:string,
    id: string,
}

/**
 * Class for CA Table
 */
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

/**
 * Get all Years of CA as options for select
 * @param cas the CAs list
 * @returns options for CA select
 */
export const getCaYearsOptions = (cas:ICa[]):IOptions[] => {
  const opts:IOptions[] = []
  const options = new Map()
  if(cas) cas.forEach(ca => {
    options.set(ca.year, ca.year)
  })
  options.forEach((value, key) => {
    opts.push({ value: key, text: value })
  })
  return opts
}

/**
 * Get all CA as options for select
 * @param cas the CAs list
 * @returns options for CA select
 */
export const getCasOptions = (cas:ICa[]):IOptions[] => {
  const opts:IOptions[] = []
  if(cas) {
    cas.forEach((ca) => {
      opts.push({ value:ca.id, text: ca.date })
    })
  }
  return opts
}

/**
 * Get the CA name
 * @param value - the CA id
 * @param cas - the CA list
 * @return the date as string
 */
export const getCaName = (value:string, cas:ICa[]) :string => {
  if(!cas || !value) return ""
  let date = ""
  cas.forEach(ca => {
    if(ca.id == value) {
      date = ca.date
    }
  })
  return date
}

