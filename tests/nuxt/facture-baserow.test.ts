import { describe, expect, it, test } from 'vitest'

describe('baserow facture', () => {
  let TEST_FACTURE:IFacture

  // count all factures
  it('count all factures form baserow', async () => {
    const factures:Facture[] = await getFacturesBr()
    expect(factures.length).toBeGreaterThan(0)
  })

    // Create new facture
  it('create one row in baserow', async () => {
    
    const createdFacture:Facture = new Facture()
    createdFacture.date = new Date("2025-08-20")
    createdFacture.num = "01"
    createdFacture.comment = "COMMENT U ADDED"
    createdFacture.statut = "A Vérifier"
    createdFacture.tva=0.2
    createdFacture.bdc = "BDC U ADDED"
    createdFacture.client = "ISEGCOM"
    createdFacture.ca = "2025-09"
    const facture = await createFactureBr(createdFacture)
    TEST_FACTURE = facture
    
    expect(facture.date).toEqual(new Date("2025-08-20"))
    expect(facture.numFac).toEqual("2025-08-01")
    expect(facture.num).toEqual("01")
    expect(facture.comment).toEqual("COMMENT U ADDED")
    expect(facture.statut).toEqual("A Vérifier")
    expect(facture.tva).toEqual(0.2)
    expect(facture.bdc).toEqual("BDC U ADDED")
    expect(facture.payDate).toBeUndefined()
    expect(facture.client).toEqual("ISEGCOM")
    expect(facture.ca).toEqual("2025-09")
  })

  // read test facture
  it('get one row form baserow', async () => {
    const facture:Facture = await getFactureBr(TEST_FACTURE.id)
    expect(facture.date).toEqual(new Date("2025-08-20"))
    expect(facture.numFac).toEqual("2025-08-01")
    expect(facture.num).toEqual("01")
    expect(facture.comment).toEqual("COMMENT U ADDED")
    expect(facture.statut).toEqual("A Vérifier")
    expect(facture.tva).toEqual(0.2)
    expect(facture.bdc).toEqual("BDC U ADDED")
    expect(facture.payDate).toBeUndefined()
    expect(facture.client).toEqual("ISEGCOM")
    expect(facture.ca).toEqual("2025-09")
  })

  // Update facture
  it('update one row in baserow', async () => {
    const originalFacture:Facture = await getFactureBr(TEST_FACTURE.id)
    expect(originalFacture.numFac).toEqual("2025-08-01")

    const updatedFacture:Facture = await getFactureBr(TEST_FACTURE.id)
    expect(updatedFacture.numFac).toEqual("2025-08-01")
    updatedFacture.date = new Date("2025-08-21")
    updatedFacture.num = "03"
    updatedFacture.comment = "COMMENT TU MODIF"
    updatedFacture.statut = "Payée"
    updatedFacture.tva=1
    updatedFacture.bdc = "BDC TU MODIF"
    updatedFacture.payDate = new Date("2025-08-22")
    updatedFacture.client = "V-Loc"
    updatedFacture.ca = "2025-10"
    const facture = await updateFactureBr(updatedFacture)
    expect(facture.numFac).toEqual("2025-08-03")
    expect(facture.date).toEqual(new Date("2025-08-21"))
    expect(facture.num).toEqual("03")
    expect(facture.comment).toEqual("COMMENT TU MODIF")
    expect(facture.statut).toEqual("Payée")
    expect(facture.tva).toEqual(1)
    expect(facture.bdc).toEqual("BDC TU MODIF")
    expect(facture.payDate).toEqual(new Date("2025-08-22"))
    expect(facture.client).toEqual("V-Loc")
    expect(facture.ca).toEqual("2025-10")
    await updateFactureBr(originalFacture)
  })

  // delete the created new facture
  it('delete one row in baserow', async () => {
    const id = await deleteFactureBr(TEST_FACTURE.id)
    expect(id).toEqual(TEST_FACTURE.id)
  })

})