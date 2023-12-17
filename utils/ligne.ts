import type { Record, FieldSet } from "airtable"
/**
 * Type for LigneFacture table
 */
export type ILigne = {
  numFacLigne:string
  ligne: string
  libelle:string
  puHT:number
  typePU:string
  quantite:number
  totalHT:number
  id: string
}

/**
 * Class for LigneFacture Table
 */
export class Ligne implements ILigne {
  numFacLigne:string
  ligne: string
  libelle:string
  puHT:number
  typePU:string
  quantite:number
  totalHT:number
  id: string

       /**
     * CA constructor
     * @param record - Record form Airtable
     */
       constructor(record:Record<FieldSet>) {
        this.numFacLigne = record.get('#NumFacLigne') as string
        this.ligne = record.get('#Ligne') as string
        this.libelle = record.get('Libellé') as string
        this.puHT = record.get('PU HT') as number
        this.typePU = record.get('PU/H') as string
        this.quantite = record.get('Quantité') as number
        this.totalHT = record.get('Total HT') as number
        this.id = record.getId()
       }
}
