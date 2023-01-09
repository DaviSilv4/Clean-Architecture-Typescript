import { CacheStoreSpy, mockPurchases } from '@/data/test'
import { LocalSavePurchases } from '@/data/use-cases'

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

describe('LocalSavePurchases', () => {
    test('Should not delete or insert cache on sut.init', () => {
        const { cacheStore } = makeSut();        
        expect(cacheStore.messages).toEqual([]);
    })

    test('Should delete old cache on sut.save', async () => {
        const { cacheStore, sut } = makeSut();    
        await sut.save(mockPurchases());
        expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete, CacheStoreSpy.Message.insert]);
        expect(cacheStore.deleteKey).toBe('purchases');
    })

    test('Should not insert new Cache if delete fails', () => {
        const { cacheStore, sut } = makeSut();    
        cacheStore.simulateDeleteError()
        const promisse = sut.save(mockPurchases());
        expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete]);
        expect(promisse).rejects.toThrow();
    })

    test('Should insert new Cache if delete succeeds', async () => {
        const { cacheStore, sut } = makeSut();    
        const purchases = mockPurchases();
        await sut.save(purchases);
        expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete, CacheStoreSpy.Message.insert]);  
        expect(cacheStore.insertKey).toBe('purchases');
        expect(cacheStore.insertValue).toEqual(purchases);
    })  

    test('Should throw if insert throws', () => {
        const { cacheStore, sut } = makeSut();    
        cacheStore.simulateInsertError()
        const promisse = sut.save(mockPurchases());
        expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete, CacheStoreSpy.Message.insert]);
        expect(promisse).rejects.toThrow();
    })
})