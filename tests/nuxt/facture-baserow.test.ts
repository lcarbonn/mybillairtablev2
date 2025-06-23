import { describe, expect, it } from 'vitest'

describe('baserow facture', () => {
  it('count all factures form baserow', async () => {
    const factures:Facture[] = await getFacturesBr()
    expect(factures.length).toBeGreaterThan(0)
    expect(factures[0].numFac).toEqual("2025-07-02")
    expect(factures[0].date).toEqual(new Date("2025-07-18"))
    expect(factures[0].client).toEqual("ISEGCOM")
    expect(factures[0].statut).toBeUndefined()
  })
})