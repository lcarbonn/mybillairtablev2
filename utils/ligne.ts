import type { BaserowRow } from "@watzon/baserow"

/**
 * Type for LigneFacture table
 */
export type ILigne = {
  numFacLigne:string|undefined
  numFac:string|undefined
  ligne: number|undefined
  libelle:string|undefined
  puHT:number|undefined
  typePU:string|undefined
  quantite:number|undefined
  totalHT:number|undefined
  id: string
}

/**
 * Class for LigneFacture Table
 */
export class Ligne implements ILigne {
  numFacLigne:string|undefined
  numFac:string|undefined
  ligne: number|undefined
  libelle:string|undefined
  puHT:number|undefined
  typePU:string|undefined
  quantite:number|undefined
  totalHT:number|undefined
  id: string

       /**
     * CA constructor
     * @param record - Record form DB
     */
      constructor(row?:BaserowRow) {
        if(row) {
          this.id = row.id.toString()
          const numFacLigne = row["field_4171442"][0]
          this.numFacLigne = numFacLigne?numFacLigne.value:undefined
          const numFac = row["field_4171447"][0]
          this.numFac = numFac?numFac.value:undefined
          this.ligne = new Number(row["field_4171446"]).valueOf()
          this.libelle = row["field_4196569"]
          this.puHT = new Number(row["field_4171443"]).valueOf()
          const typePU = row["field_4171445"]
          this.typePU = typePU?typePU.value:undefined
          this.quantite = new Number(row["field_4171573"]).valueOf()
          this.totalHT = new Number(row["field_4172031"]).valueOf()
        }
        else {
          this.id=""
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
