/**
 * get all CA and set state
 */
export const getStateCas = () => {
    getCasBr().then((list) => {
        useCas().value = list
    })
}
