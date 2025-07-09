import { describe, expect, it } from 'vitest'

describe('baserow ca', () => {

  // count all CA
  it('count all CA form baserow', async () => {
    const cas:ICa[] = await getCasBr()
    expect(cas.length).toEqual(60)
  })

})