import { CacheStore } from "@/data/protocols/cache";
import { CacheStoreSpy } from "./local-save-purchases.spec";

export class LocalSavePurchases{
    constructor(public cacheStore: CacheStore){}

    async save(): Promise<any>{
        this.cacheStore.delete('purchases');
    }
}

export type SutTypes = {
    sut: LocalSavePurchases,
    cacheStore: CacheStoreSpy
}
