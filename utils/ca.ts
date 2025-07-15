import type { BaserowRow } from "@watzon/baserow"

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
     * CA constructor
     * @param record - Record form db
     */
      constructor(row:BaserowRow) {
        const {$caConfig  } = useNuxtApp()
        const CA_CONF = $caConfig as ICaConf

        this.id = row[CA_CONF.CA_DATE]
        this.date = row[CA_CONF.CA_DATE],
        this.year = row[CA_CONF.CA_YEAR]
      }
}

/**
 * Get all Years of CA as options for select
 * @param cas the CAs list
 * @returns options for CA select
 */
export const getCaYearsOptions = (cas:ICa[]):IOption[] => {
  const opts:IOption[] = []
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
export const getCasOptions = (cas:ICa[]):IOption[] => {
  const opts:IOption[] = []
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

