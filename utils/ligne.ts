import type { Record, FieldSet } from "airtable"
/**
 * Type for LigneFacture table
 */
export type ILigne = {
  numFacLigne:string|undefined
  numFac:string[]|undefined
  ligne: number|undefined
  libelle:string|undefined
  puHT:number|undefined
  typePU:string|undefined
  quantite:number|undefined
  totalHT:number|undefined
  id: string|undefined
}

/**
 * Class for LigneFacture Table
 */
export class Ligne implements ILigne {
  numFacLigne:string|undefined
  numFac:string[]|undefined
  ligne: number|undefined
  libelle:string|undefined
  puHT:number|undefined
  typePU:string|undefined
  quantite:number|undefined
  totalHT:number|undefined
  id: string|undefined

       /**
     * CA constructor
     * @param record - Record form Airtable
     */
       constructor(record?:Record<FieldSet>) {
        if(record) {
          this.numFacLigne = record.get('#NumFacLigne') as string
          this.numFac = record.get('#NumFac') as string[]
          this.ligne = record.get('#Ligne') as number
          this.libelle = record.get('Libellé') as string
          this.puHT = record.get('PU HT') as number
          this.typePU = record.get('PU/H') as string
          this.quantite = record.get('Quantité') as number
          this.totalHT = record.get('Total HT') as number
          this.id = record.getId()
        }
       }
}

export const getMaxNumLigne = (lignes:ILigne[]) : number => {
  let maxNumLigne = 0
  if(lignes && lignes.length>0) {
    lignes.forEach(ligne => {
      if(ligne.ligne && ligne.ligne>maxNumLigne) maxNumLigne = ligne.ligne
    });
  }
  return ++maxNumLigne
}
