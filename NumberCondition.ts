import { objectNotArrayNotNull } from "./utils"

export default class NumberCondition {
    all?: NumberCondition[]
    any?: NumberCondition[]
    not?: NumberCondition

    eq?: number
    gt?: number
    gte?: number
    lt?: number
    lte?: number

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }

        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, eq, gt, gte, lt, lte'
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
        if (eqValue !== undefined) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof eqValue !== 'number') {
                throw 'eq must be a Number'
            }
            this.eq = eqValue
            oneConditionSpecified = true
        }

        const gtValue = input['gt']
        if (gtValue !== undefined) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof gtValue !== 'number') {
                throw 'gt must be a Number'
            }
            this.gt = gtValue
            oneConditionSpecified = true
        }

        const gteValue = input['gte']
        if (gteValue !== undefined) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof gteValue !== 'number') {
                throw 'gte must be a Number'
            }
            this.gte = gteValue
            oneConditionSpecified = true
        }

        const ltValue = input['lt']
        if (ltValue !== undefined) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof ltValue !== 'number') {
                throw 'lt must be a Number'
            }
            this.lt = ltValue
            oneConditionSpecified = true
        }

        const lteValue = input['lte']
        if (lteValue !== undefined) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof lteValue !== 'number') {
                throw 'lte must be a Number'
            }
            this.lte = lteValue
            oneConditionSpecified = true
        }

        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
        }
    }
    check(input: any): boolean {
        if (typeof input !== 'number') {
            throw 'input must be a number'
        }
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
        if (this.eq !== undefined) {
            return input === this.eq
        }
        if (this.gt !== undefined) {
            return input > this.gt
        }
        if (this.gte !== undefined) {
            return input >= this.gte
        }
        if (this.lt !== undefined) {
            return input < this.lt
        }
        if (this.lte !== undefined) {
            return input <= this.lte
        }
        throw 'NumberConditon does not contain anything. Constructor should have thrown but did not.'
    }
}
