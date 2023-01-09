import { SavePurchases } from "@/domain/user-cases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore{
    action: CacheStoreSpy.Action[];
    deleteKey: string;
    insertKey: string;
    insertValue: SavePurchases.Params[] = [];

    public delete(): void {
        this.action.push(CacheStoreSpy.Action.delete)
        this.deleteKey;
    }

    public insert(key: string, value: any): void {
        this.action.push(CacheStoreSpy.Action.insert)
        this.insertKey;
        this.insertValue = value;
    }

    public simulateDeleteError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {
            this.action.push(CacheStoreSpy.Action.delete);
            throw new Error();
        })
    }

    public simulateInsertError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => {
            this.messages.push(CacheStoreSpy.Action.insert);
            throw new Error();
        })
    }
}

export namespace CacheStoreSpy{
    export enum Action{
        delete,
        insert
    }
}