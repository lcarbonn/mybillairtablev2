export type IFilter = {
    ca: string|undefined,
    search:string|undefined,
    client:string|undefined
}

export class Filter implements IFilter {
  ca: string|undefined
  search:string|undefined
  client: string|undefined

    // /**
    //  * Card constructor
    //  * @param ca
    //  */
    //    constructor(ca:string, search:string, client:string) {
    //     this.ca = ca
    //     this.search = search
    //     this.client = client
    //    }
}
