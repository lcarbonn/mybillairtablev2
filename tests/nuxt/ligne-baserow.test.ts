import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { updateLigneBr } from '~/utils/useLigneBaserow'

describe('baserow ligne', () => {
  let TEST_FACTURE:IFacture
  let TEST_LIGNE:ILigne

    // create facture before ligne
    beforeAll(async () => {
      const createdFacture:Facture = new Facture()
      createdFacture.date = new Date("2025-08-20")
      createdFacture.num = "01"
      createdFacture.comment = "TEST U ADDED"
      createdFacture.statut = "A Vérifier"
      createdFacture.tva=0.2
      createdFacture.bdc = "BDC U ADDED"
      createdFacture.client = "ISEGCOM"
      createdFacture.ca = "2025-09"
      const facture = await createFactureBr(createdFacture)
      TEST_FACTURE = facture
  })

      // Create new ligne
  it('create one row in baserow', async () => {
    
    const createdLigne:Ligne = new Ligne()
    createdLigne.numFac = TEST_FACTURE.numFac
    createdLigne.libelle = "LIGNE TU ADDED"
    createdLigne.ligne = 3
    createdLigne.puHT = 80
    createdLigne.typePU = "jour"
    const ligne = await createLigneBr(createdLigne)
    console.log("ligne id:"+ligne.id)
    TEST_LIGNE = ligne
    expect(ligne.numFac).toEqual(TEST_FACTURE.numFac)
    expect(ligne.numFacLigne).toEqual(TEST_FACTURE.numFac+"-3")
    expect(ligne.ligne).toEqual(3)
    expect(ligne.libelle).toEqual("LIGNE TU ADDED")
    expect(ligne.puHT).toEqual(80)
    expect(ligne.typePU).toEqual("jour")
    expect(ligne.totalHT).toEqual(0)
  })

  // count all lignes
  it('count all lignes form baserow', async () => {
    const lignes:Ligne[] = await getLignesBr(TEST_FACTURE.numFac)
    expect(lignes.length).toEqual(1)
  })

  // Update ligne 378
  it('update one row in baserow', async () => {
    const lignes:Ligne[] = await getLignesBr(TEST_FACTURE.numFac)
    expect(lignes.length).toEqual(1)

    const originalLigne:Ligne = lignes[0]

    const lignes2:Ligne[] = await getLignesBr(TEST_FACTURE.numFac)
    const updatedLigne = lignes2[0]
    updatedLigne.libelle = ("LIGNE TU UPDATED")
    updatedLigne.ligne = (4)
    updatedLigne.puHT = (100)
    updatedLigne.typePU = ("forfait")

    const ligne = await updateLigneBr(updatedLigne)
    expect(ligne.numFac).toEqual(TEST_FACTURE.numFac)
    expect(ligne.numFacLigne).toEqual(TEST_FACTURE.numFac+"-4")
    expect(ligne.ligne).toEqual(4)
    expect(ligne.libelle).toEqual("LIGNE TU UPDATED")
    expect(ligne.puHT).toEqual(100)
    expect(ligne.typePU).toEqual("forfait")
    expect(ligne.totalHT).toEqual(100)

    await updateLigneBr(originalLigne)
  })

  // Delete new ligne
  it('delete one row in baserow', async () => {
    const id = await deleteLigneBr(TEST_LIGNE.id)
    expect(id).toEqual(TEST_LIGNE.id)
  })

  // delete test facture
  afterAll(async () => {
      const facture = await deleteFactureBr(TEST_FACTURE.id)
  })

})