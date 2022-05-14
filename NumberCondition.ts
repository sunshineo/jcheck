import objectNotArrayNotNull from "./utils"

export default class NumberCondition {
    all?: NumberCondition[]
    any?: NumberCondition[]
    not?: NumberCondition

    eq?: number
    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }

        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, or eq'
        const allArray: any = input['all']
        if (allArray) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            oneConditionSpecified = true
            if (!Array.isArray(allArray)) {
                throw '"all" must be an array'
            }
            if (allArray.length === 0) {
                throw '"all" array cannot be empty'
            }
            this.all = []
            for(const cond of allArray) {
                this.all.push(new NumberCondition(cond))
            }
        }
        
        const anyArray: any = input['any']
        if (anyArray) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            oneConditionSpecified = true
            if (!Array.isArray(anyArray)) {
                throw '"any" must be an array'
            }
            if (anyArray.length === 0) {
                throw '"any" array cannot be empty'
            }
            this.any = []
            for(const cond of anyArray) {
                this.any.push(new NumberCondition(cond))
            }
        }

        const notValue: any = input['not']
        if (notValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.not = new NumberCondition(notValue)
            oneConditionSpecified = true
        }

        const eqValue = input['eq']
        if (eqValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof eqValue !== 'number') {
                throw 'eq must be a Number'
            }
            this.eq = eqValue
            oneConditionSpecified = true
        }
        throw oneAndOnlyOneMsg
    }
    check(input: number): boolean {
        if (this.all) {
            for (const childCondition of this.all) {
                if (!childCondition.check(input)) {
                    return false
                }
            }
            return true
        }
        if (this.any) {
            for (const childCondition of this.any) {
                if (childCondition.check(input)) {
                    return true
                }
            }
            return false
        }
        if (this.not) {
            return !this.not.check(input)
        }
        if (this.eq) {
            return input === this.eq
        }
        throw 'StringConditon does not contain anything. Constructor should have thrown but did not.'
    }
}
