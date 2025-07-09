import { describe, expect, it } from 'vitest'

describe('baserow client', () => {

  // count all clients
  it('count all clients form baserow', async () => {
    const clients:IClient[] = await getClientsBr()
    expect(clients.length).toEqual(19)
  })

})