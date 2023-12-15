/**
 * get all Clients and set state
 */
export const getStateClients = () => {
    getClientsDb().then((list) => {
        useClients().value = list
    })
}
