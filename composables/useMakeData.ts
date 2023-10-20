import { faker } from '@faker-js/faker'

export type Person = {
    name: string,
    date: Date,
    email: string,
    approved: boolean,
    verified: boolean,
    image: string,
    subRows?: Person[]
};

const range = (len: number) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newPerson = (): Person => {
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        approved:  faker.helpers.shuffle<boolean>([
            true,
            false
        ])[0]!,
        verified: faker.helpers.shuffle<boolean>([
            true,
            false
        ])[0]!,
        date: faker.datatype.datetime({ max: new Date().getTime() }),
        image: `https://i.pravatar.cc/256?u=fake@prartar${faker.number.int(40)}.com`,
    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Person[] => {
        const len = lens[depth]!
        return range(len).map((d): Person => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}
