import type { Record, FieldSet } from "airtable"
/**
 * Type for LigneFacture table
 */
export type ILigne = {
  numFac:string
  ligne: string
  libelle:string
  puHT:string
  puH:string
  quantite:string
  totalHT:string
  id: string
}

/**
 * Class for LigneFacture Table
 */
export class Ligne implements ILigne {
  numFac:string
  ligne: string
  libelle:string
  puHT:string
  puH:string
  quantite:string
  totalHT:string
  id: string

       /**
     * CA constructor
     * @param record - Record form Airtable
     */
       constructor(record:Record<FieldSet>) {
        this.numFac = record.get('#NumFacLigne') as string
        this.ligne = record.get('#Ligne') as string
        this.libelle = record.get('Libelle') as string
        this.puHT = record.get('PU HT') as string
        this.puH = record.get('PU/H') as string
        this.quantite = record.get('Quantité') as string
        this.totalHT = record.get('Total HT') as string
        this.id = record.getId()
       }
}
