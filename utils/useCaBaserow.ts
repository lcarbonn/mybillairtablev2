import { BaserowClient } from "@watzon/baserow";

/**
 * Get all CA from db
 * @returns Promise - the CA list
 */
export const getCasBr = () :Promise<ICa[]> => {
    return new Promise((resolve, reject) => {
        const { $baserow, $baserowConfig, $caConfig  } = useNuxtApp()
        const client = $baserow as BaserowClient
        const config = $baserowConfig as IBrConf
        const CA_CONF = $caConfig as ICaConf
        const orderBy = new String("-"+CA_CONF.CA_DATE).valueOf()
        client.databaseRows.list(
        config.tableCa,
        {
            page:1,
            size:200,
            orderBy:orderBy
        }
        ).then((rows) => {
            const cas:ICa[] = []
            rows.results.forEach(row => {
                const ca = new Ca(row)
                cas.push(ca)
            });
            resolve(cas)
        })
    })
}