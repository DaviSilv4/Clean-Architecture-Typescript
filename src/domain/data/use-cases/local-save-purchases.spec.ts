class LocalSavePurchases{
    constructor(public cacheStore: CacheStore){}

    async save(): Promise<any>{
        this.cacheStore.delete();
    }
}

interface CacheStore{
    delete: () => void;
}

class CacheStoreSpy implements CacheStore{
    deleteCallsCount = 0;

    public delete(): void {
        this.deleteCallsCount++;
    }
}

describe('LocalSavePurchases', () => {
    test('Shoul not delete cache on sut.init', () => {
        const cacheStore = new CacheStoreSpy();        
        new LocalSavePurchases(cacheStore);
        expect(cacheStore.deleteCallsCount).toBe(0);
    })

    test('Shoul delete old cache on sut.save', async () => {
        const cacheStore = new CacheStoreSpy();        
        const sut = new LocalSavePurchases(cacheStore);
        await sut.save();
        expect(cacheStore.deleteCallsCount).toBe(1  );
    })
    test('Shoul delete old cache on sut.save', async () => {
        expect(1).toBe(1);
    })
})