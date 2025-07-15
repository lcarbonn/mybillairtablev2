import { BaserowClient } from "@watzon/baserow";
import { Client } from "./client";

/**
 * Get all Clients from database
 * @returns Promise - the Clients list
 */
export const getClientsBr = () :Promise<IClient[]> => {
  return new Promise((resolve, reject) => {
    const { $baserow, $baserowConfig, $clientConfig  } = useNuxtApp()
    const client = $baserow as BaserowClient
    const config = $baserowConfig as IBrConf
    const CLIENT_CONF = $clientConfig as IClientConf
    const orderBy = CLIENT_CONF.CLIENT_NAME
    client.databaseRows.list(
    config.tableClient,
      {
        page:1,
        size:50,
        orderBy:orderBy
      }
    ).then((rows) => {
        const clients:IClient[] = []
        rows.results.forEach(row => {
            const client = new Client(row)
            clients.push(client)
        });
        resolve(clients)
    })
  })
}