import { jsontype } from "./utils"

export class NumberCondition {
    all?: NumberCondition[]
    any?: NumberCondition[]
    not?: NumberCondition

    eq?: number
    ne?: number
    gt?: number
    gte?: number
    lt?: number
    lte?: number

    constructor(input: any) {
        if (jsontype(input) !== 'object') {
            throw 'input must be an object not array and not null'
        }

        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, eq, gt, gte, lt, lte'
        if ('all' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const allValue: any = input['all']
            if (jsontype(allValue) !== 'array') {
                throw '"all" must be an array'
            }
            if (allValue.length === 0) {
                throw '"all" array cannot be empty'
            }
            this.all = []
            for(const cond of allValue) {
                this.all.push(new NumberCondition(cond))
            }
            oneConditionSpecified = true
        }
        
        if ('any' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const anyValue: any = input['any']
            if (jsontype(anyValue) !== 'array') {
                throw '"any" must be an array'
            }
            if (anyValue.length === 0) {
                throw '"any" array cannot be empty'
            }
            this.any = []
            for(const cond of anyValue) {
                this.any.push(new NumberCondition(cond))
            }
            oneConditionSpecified = true
        }

        if ('not' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const notValue: any = input['not']
            this.not = new NumberCondition(notValue)
            oneConditionSpecified = true
        }

        if ('eq' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const eqValue = input['eq']
            if (jsontype(eqValue) !== 'number') {
                throw 'eq must be a Number'
            }
            this.eq = eqValue
            oneConditionSpecified = true
        }
        if ('ne' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const neValue = input['ne']
            if (jsontype(neValue) !== 'number') {
                throw 'ne must be a Number'
            }
            this.ne = neValue
            oneConditionSpecified = true
        }

        if ('gt' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const gtValue = input['gt']
            if (jsontype(gtValue) !== 'number') {
                throw 'gt must be a Number'
            }
            this.gt = gtValue
            oneConditionSpecified = true
        }

        if ('gte' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const gteValue = input['gte']
            if (jsontype(gteValue) !== 'number') {
                throw 'gte must be a Number'
            }
            this.gte = gteValue
            oneConditionSpecified = true
        }

        if ('lt' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const ltValue = input['lt']
            if (jsontype(ltValue) !== 'number') {
                throw 'lt must be a Number'
            }
            this.lt = ltValue
            oneConditionSpecified = true
        }

        if ('lte' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const lteValue = input['lte']
            if (jsontype(lteValue) !== 'number') {
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
        if (jsontype(input) !== 'number') {
            return false
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
        if (this.ne !== undefined) {
            return input !== this.ne
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
