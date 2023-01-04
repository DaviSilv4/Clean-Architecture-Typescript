import { CacheStore } from "@/data/protocols/cache";

export class LocalSavePurchases{
    constructor(public cacheStore: CacheStore){}

    async save(): Promise<any>{
        this.cacheStore.delete('purchases');
        this.cacheStore.insert('purchases');
    }
}

