import { objectNotArrayNotNull } from "./utils"

export class BooleanCondition {
    eq: boolean

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        const eqValue = input['eq']
        if (typeof eqValue !== 'boolean') {
            throw 'Must provide eq value with either true or false'
        }
        this.eq = eqValue
    }
    check(input: any): boolean {
        if (typeof input !== 'boolean') {
            return false
        }
        return input === this.eq
    }
}
