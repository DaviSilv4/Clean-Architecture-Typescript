import { SavePurchases } from "@/domain/user-cases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore{
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
