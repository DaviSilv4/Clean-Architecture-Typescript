class LocalSavePurchases{
    constructor(public cacheStore: CacheStore){}

    async save(): Promise<any>{
        this.cacheStore.delete('purchases');
    }
}

interface CacheStore{
    delete: (key: string) => void;
}

type SutTypes = {
    sut: LocalSavePurchases,
    cacheStore: CacheStoreSpy
}

const makeSut = (): SutTypes => {
    const cacheStore = new CacheStoreSpy();        
    const sut = new LocalSavePurchases(cacheStore);

    return { 
        sut,
        cacheStore
    }
}

class CacheStoreSpy implements CacheStore{
    deleteCallsCount = 0;
    key: string

    public delete(): void {
        this.deleteCallsCount++;
        this.key;
    }
}

describe('LocalSavePurchases', () => {
    test('Shoul not delete cache on sut.init', () => {
        const { cacheStore } = makeSut();        
        expect(cacheStore.deleteCallsCount).toBe(0);
    })

    test('Shoul delete old cache on sut.save', async () => {
        const { cacheStore, sut } = makeSut();    
        await sut.save();
        expect(cacheStore.deleteCallsCount).toBe(1);
        expect(cacheStore.key).toBe('purchases');

    })

    test('Shoul call delete with correct key', async () => {
        const { cacheStore, sut } = makeSut();    
        await sut.save();
    })
  
})