export interface SavePurchasesModel{
    save: (purchases: SavePurchasesModel.Params[]) => Promise<void>
}

namespace SavePurchasesModel {
    export type Params = {
        id: string,
        date: Date,
        value: number
    }

}
