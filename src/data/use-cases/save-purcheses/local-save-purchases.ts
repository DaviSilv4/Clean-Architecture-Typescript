import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain";

export class LocalSavePurchases implements SavePurchases {
    constructor(public cacheStore: CacheStore){}

    async save(purchases: SavePurchases.Params[]): Promise<any>{
        this.cacheStore.delete('purchases');
        this.cacheStore.insert('purchases', purchases);
    }
}

