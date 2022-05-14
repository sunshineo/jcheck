import objectNotArrayNotNull from "./utils"

export default class StringCondition {
    all?: StringCondition[]
    any?: StringCondition[]
    not?: StringCondition

    eq?: string
    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }

        let oneConditionSpecified: boolean = false
        const allArray: any = input['all']
        if (allArray) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or eq'
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
                this.all.push(new StringCondition(cond))
            }
        }
        
        const anyArray: any = input['any']
        if (anyArray) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or eq'
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
                this.any.push(new StringCondition(cond))
            }
        }

        const notValue: any = input['not']
        if (notValue) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or eq'
            }
            this.not = new StringCondition(notValue)
            oneConditionSpecified = true
        }

        const eqValue = input['eq']
        if (eqValue) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or eq'
            }
            if (typeof eqValue !== 'string') {
                throw 'eq must be a string'
            }
            this.eq = eqValue
            oneConditionSpecified = true
        }
        throw 'Must have one and only one of: all, any, not, or eq'
    }
    check(input: string): boolean {
        return input === this.eq
    }
}
