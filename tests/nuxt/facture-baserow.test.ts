import { describe, expect, it } from 'vitest'
import { getFactureBr } from '~/utils/useFactureBaserow'

describe('baserow facture', () => {
  
  // count all factures
  it('count all factures form baserow', async () => {
    const factures:Facture[] = await getFacturesBr()
    expect(factures.length).toBeGreaterThan(0)
  })

  // read test facture 286
  it('get one row form baserow', async () => {
    const facture:Facture = await getFactureBr("286")
    expect(facture.date).toEqual(new Date("2025-06-20"))
    expect(facture.numFac).toEqual("2025-06-01")
    expect(facture.num).toEqual("01")
    expect(facture.comment).toEqual("COMMENT TU")
    expect(facture.statut).toEqual("A Vérifier")
    expect(facture.tva).toEqual(20)
    expect(facture.client).toEqual("ISEGCOM")
    expect(facture.bdc).toEqual("BDC TU")
    expect(facture.ca).toEqual("2025-07")
    expect(facture.payDate).toBeUndefined()
  })

  // Update facture 286
  it('update one row in baserow', async () => {
    const originalFacture:Facture = await getFactureBr("286")
    expect(originalFacture.date).toEqual(new Date("2025-06-20"))
    console.log("payDate:", originalFacture.payDate)

    const updatedFacture:Facture = await getFactureBr("286")
    updatedFacture.date = new Date("2025-06-21")
    updatedFacture.num = "02"
    updatedFacture.comment = "TEST U MODIF"
    updatedFacture.statut = "Payée"
    updatedFacture.tva=100
    updatedFacture.bdc = "BDC U MODIF"
    updatedFacture.payDate = new Date("2025-06-22")
    updatedFacture.client = "V-Loc"
    updatedFacture.ca = "2025-08"
    const facture = await updateFactureBr(updatedFacture)
    expect(facture.date).toEqual(new Date("2025-06-21"))
    expect(facture.numFac).toEqual("2025-06-02")
    expect(facture.num).toEqual("02")
    expect(facture.comment).toEqual("TEST U MODIF")
    expect(facture.statut).toEqual("Payée")
    expect(facture.tva).toEqual(100)
    expect(facture.bdc).toEqual("BDC U MODIF")
    expect(facture.payDate).toEqual(new Date("2025-06-22"))
    expect(facture.client).toEqual("V-Loc")
    expect(facture.ca).toEqual("2025-08")
    await updateFactureBr(originalFacture)
  })

})