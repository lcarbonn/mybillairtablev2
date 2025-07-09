/**
 * get all Clients and set state
 */
export const getStateClients = () => {
    getClientsBr().then((list) => {
        useClients().value = list
    })
}
