/**
 * get all CA and set state
 */
export const getStateCas = () => {
    getCasDb().then((list) => {
        useCas().value = list
    })
}
