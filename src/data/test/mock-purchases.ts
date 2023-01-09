import { SavePurchases } from "@/domain/user-cases";
import faker from 'faker';

export const mockPurchases = (): SavePurchases.Params[] => [
    {
        id: faker.random.uuid(),
        date: faker.date.recent(),
        value: faker.random.number(),
    },
    {
        id: faker.random.uuid(),
        date: faker.date.recent(),
        value: faker.random.number()
    }
]