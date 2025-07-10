import { describe, expect, it } from 'vitest'

describe('baserow client', () => {

  // count all clients
  it('count all clients form baserow', async () => {
    const clients:IClient[] = await getClientsBr()
    expect(clients.length).toEqual(19)
  })

    // test payment delay of IPPON, id 6
  it('count all clients form baserow', async () => {
    const clients:IClient[] = await getClientsBr()
    const pd = getPaymentDelay(clients, "Ippon Technologies")
    clients.forEach(client => {
      console.log("Client:",client.name, ", id", client.id)
    });
    console.log("paymentDate:",pd)
    expect(pd).toEqual(60)
  })

})