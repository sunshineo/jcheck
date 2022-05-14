import objectNotArrayNotNull from "./utils"

export default class NumberCondition {
    eq: number
    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        const eqValue = input['eq']
        if (!eqValue) {
            throw 'Currently we only support eq'
        }
        if (typeof eqValue !== 'number') {
            throw 'eq must be a number'
        }
        this.eq = eqValue
    }
    check(input: number): boolean {
        return input === this.eq
    }
}
