import { CacheStoreSpy, mockPurchases } from '@/data/test'
import { LocalSavePurchases } from '@/data/use-cases'

type SutTypes = {
    sut: LocalSavePurchases,
    cacheStore: CacheStoreSpy
}

const makeSut = (timestamp = new Date()): SutTypes => {
    const cacheStore = new CacheStoreSpy();        
    const sut = new LocalSavePurchases(cacheStore, timestamp);

    return { 
        sut,
        cacheStore
    }
}

describe('LocalSavePurchases', () => {
    test('Should not delete or insert cache on sut.init', () => {
        const { cacheStore } = makeSut();        
        expect(cacheStore.action).toEqual([]);
    })

    test('Should not insert new Cache if delete fails', async () => {
        const { cacheStore, sut } = makeSut();    
        cacheStore.simulateDeleteError()
        const promisse = sut.save(mockPurchases());
        expect(cacheStore.action).toEqual([CacheStoreSpy.Action.delete]);
        await expect(promisse).rejects.toThrow();
    })

    test('Should insert new Cache if delete succeeds', async () => {a
        const timestamp = new Date();
        const { cacheStore, sut } = makeSut();    
        const purchases = mockPurchases();
        const promisse = sut.save(purchases);
        expect(cacheStore.action).toEqual([CacheStoreSpy.Action.delete, CacheStoreSpy.Action.insert]);  
        expect(cacheStore.deleteKey).toBe('purchases');
        expect(cacheStore.insertKey).toBe('purchases');
        expect(cacheStore.insertValue).toEqual({
            timestamp,
            value: purchases
        });
        await expect(promisse).resolves.toBeFalsy
    })  

    test('Should throw if insert throws', async () => {
        const { cacheStore, sut } = makeSut();    
        cacheStore.simulateInsertError()
        const promisse = sut.save(mockPurchases());
        expect(cacheStore.action).toEqual([CacheStoreSpy.Action.delete, CacheStoreSpy.Action.insert]);
        await expect(promisse).rejects.toThrow();
    })
})