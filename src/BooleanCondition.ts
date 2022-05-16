import { jsontype } from "./utils"

export class BooleanCondition {
    eq?: boolean
    ne?: boolean

    constructor(input: any) {
        if (jsontype(input) !== 'object') {
            throw 'input must be an object not array and not null'
        }
        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must specify one and only one of: eq, ne'
        if ('eq' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const eqValue = input['eq']
            if (jsontype(input) !== 'boolean') {
                throw 'eq must be either true or false'
            }
            this.eq = eqValue
            oneConditionSpecified = true
        }
        if ('ne' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const neValue = input['ne']
            if (jsontype(input) !== 'boolean') {
                throw 'ne must be either true or false'
            }
            this.ne = neValue
            oneConditionSpecified = true
        }
        if (!oneAndOnlyOneMsg) {
            throw oneAndOnlyOneMsg
        }
    }
    check(input: any): boolean {
        if (jsontype(input) !== 'boolean') {
            return false
        }
        if (this.eq) {
            return input === this.eq
        }
        if (this.ne) {
            return input !== this.eq
        }
        throw 'BooleanCondition does not contain anything. Constructor should have thrown but did not.'
    }
}
