import { CacheStore } from '@/data/protocols/cache'
import { LocalSavePurchases } from '@/data/use-cases'
import { SavePurchases } from '@/domain'

type SutTypes = {
    sut: LocalSavePurchases,
    cacheStore: CacheStoreSpy
}

const mockPurchases = (): SavePurchases.Params[] => [
    {
        id: '1',
        date: new Date(),
        value: 1
    },
    {
        id: '5',
        date: new Date(),
        value: 64
    }
]

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
    insertCallsCount = 0;
    deleteKey: string;
    insertKey: string;
    insertValue: SavePurchases.Params[] = [];

    public delete(): void {
        this.deleteCallsCount++;
        this.deleteKey;
    }

    public insert(key: string, value: any): void {
        this.insertCallsCount++;
        this.insertKey;
        this.insertValue = value;
    }

    public simulateDeleteError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {
            throw new Error();
        })
    }

    public simulateInsertError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => {
            throw new Error();
        })
    }
}

describe('LocalSavePurchases', () => {
    test('Should not delete cache on sut.init', () => {
        const { cacheStore } = makeSut();        
        expect(cacheStore.deleteCallsCount).toBe(0);
    })

    test('Should delete old cache on sut.save', async () => {
        const { cacheStore, sut } = makeSut();    
        await sut.save(mockPurchases());
        expect(cacheStore.deleteCallsCount).toBe(1);
        expect(cacheStore.deleteKey).toBe('purchases');
    })

    test('Should not insert new Cache if delete fails', () => {
        const { cacheStore, sut } = makeSut();    
        cacheStore.simulateDeleteError()
        const promisse = sut.save(mockPurchases());
        expect(cacheStore.insertCallsCount).toBe(0);
        expect(promisse).rejects.toThrow();
    })

    test('Should insert new Cache if delete succeeds', async () => {
        const { cacheStore, sut } = makeSut();    
        const purchases = mockPurchases();
        await sut.save(purchases);
        expect(cacheStore.deleteCallsCount).toBe(1);
        expect(cacheStore.insertCallsCount).toBe(1);    
        expect(cacheStore.insertKey).toBe('purchases');
        expect(cacheStore.insertValue).toEqual(purchases);
    })  

    test('Should throw if insert throws', () => {
        const { cacheStore, sut } = makeSut();    
        cacheStore.simulateInsertError()
        const promisse = sut.save(mockPurchases());
        expect(promisse).rejects.toThrow();
    })
})