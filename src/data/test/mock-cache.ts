import { SavePurchases } from "@/domain/user-cases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore{
    messages: CacheStoreSpy.Message[];
    deleteKey: string;
    insertKey: string;
    insertValue: SavePurchases.Params[] = [];

    public delete(): void {
        this.messages.push(CacheStoreSpy.Message.delete)
        this.deleteKey;
    }

    public insert(key: string, value: any): void {
        this.messages.push(CacheStoreSpy.Message.insert)
        this.insertKey;
        this.insertValue = value;
    }

    public simulateDeleteError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => {
            this.messages.push(CacheStoreSpy.Message.delete);
            throw new Error();
        })
    }

    public simulateInsertError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => {
            this.messages.push(CacheStoreSpy.Message.insert);
            throw new Error();
        })
    }
}

export namespace CacheStoreSpy{
    export enum Message{
        delete,
        insert
    }
}