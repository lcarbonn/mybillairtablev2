import { describe, expect, it } from 'vitest'

describe('baserow ligne', () => {
  let created_id = ''

  // count all lignes
  it('count all lignes form baserow', async () => {
    const lignes:Ligne[] = await getLignesBr("2025-06-02")
    expect(lignes.length).toEqual(2)
    expect(lignes[0].id).toEqual("378")
    expect(lignes[0].numFac).toEqual("2025-06-02")
    expect(lignes[0].numFacLigne).toEqual("2025-06-02-1")
    expect(lignes[0].ligne).toEqual(1)
    expect(lignes[0].libelle).toEqual("LIGNE TU")
    expect(lignes[0].puHT).toEqual(70)
    expect(lignes[0].typePU).toEqual("heure")
    expect(lignes[0].totalHT).toEqual(0)
  })

  // // Update facture 286
  // it('update one row in baserow', async () => {
  //   const originalFacture:Facture = await getFactureBr("286")
  //   expect(originalFacture.date).toEqual(new Date("2025-06-20"))
  //   console.log("payDate:", originalFacture.payDate)

  //   const updatedFacture:Facture = await getFactureBr("286")
  //   updatedFacture.date = new Date("2025-06-21")
  //   updatedFacture.num = "02"
  //   updatedFacture.comment = "COMMENT TU MODIF"
  //   updatedFacture.statut = "Payée"
  //   updatedFacture.tva=1
  //   updatedFacture.bdc = "BDC TU MODIF"
  //   updatedFacture.payDate = new Date("2025-06-22")
  //   updatedFacture.client = "V-Loc"
  //   updatedFacture.ca = "2025-08"
  //   const facture = await updateFactureBr(updatedFacture)
  //   expect(facture.date).toEqual(new Date("2025-06-21"))
  //   expect(facture.numFac).toEqual("2025-06-02")
  //   expect(facture.num).toEqual("02")
  //   expect(facture.comment).toEqual("COMMENT TU MODIF")
  //   expect(facture.statut).toEqual("Payée")
  //   expect(facture.tva).toEqual(1)
  //   expect(facture.bdc).toEqual("BDC TU MODIF")
  //   expect(facture.payDate).toEqual(new Date("2025-06-22"))
  //   expect(facture.client).toEqual("V-Loc")
  //   expect(facture.ca).toEqual("2025-08")
  //   await updateFactureBr(originalFacture)
  // })

    // Create new ligne
  it('create one row in baserow', async () => {
    
    const createdLigne:Ligne = new Ligne()
    createdLigne.numFac = "2025-06-02"
    createdLigne.libelle = "LIGNE TU ADDED"
    createdLigne.ligne = 3
    createdLigne.puHT = 80
    createdLigne.typePU = "jour"
    const ligne = await createLigneBr(createdLigne)
    console.log("ligne id:"+ligne.id)
    created_id = ligne.id
    expect(ligne.numFac).toEqual("2025-06-02")
    expect(ligne.numFacLigne).toEqual("2025-06-02-3")
    expect(ligne.ligne).toEqual(3)
    expect(ligne.libelle).toEqual("LIGNE TU ADDED")
    expect(ligne.puHT).toEqual(80)
    expect(ligne.typePU).toEqual("jour")
    expect(ligne.totalHT).toEqual(0)
  })

  // Delete new ligne
  it('delete one row in baserow', async () => {
    const id = await deleteLigneBr(created_id)
    expect(id).toEqual(created_id)
  })

})