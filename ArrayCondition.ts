import NumberCondition from "./NumberCondition"
import objectNotArrayNotNull from "./utils"

export default class ArrayCondition {
    all?: ArrayCondition[]
    any?: ArrayCondition[]
    not?: ArrayCondition

    sizeCondition?: NumberCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        let oneConditionSpecified: boolean = false
        const allArray: any = input['all']
        if (allArray) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or sizeCondition'
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
                this.all.push(new ArrayCondition(cond))
            }
        }
        
        const anyArray: any = input['any']
        if (anyArray) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or sizeCondition'
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
                this.any.push(new ArrayCondition(cond))
            }
        }

        const notValue: any = input['not']
        if (notValue) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or sizeCondition'
            }
            this.not = new ArrayCondition(notValue)
            oneConditionSpecified = true
        }

        const sizeConditionValue: any = input['sizeCondition']
        if (sizeConditionValue) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or sizeCondition'
            }
            this.sizeCondition = new NumberCondition(sizeConditionValue)
            oneConditionSpecified = true
        }

        if (!oneConditionSpecified) {
            throw 'Must specify one and only one of: sizeCondition'
        }
    }
    check(input: any) {
        if (!Array.isArray(input)) {
            throw 'input must be an array'
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
        if (this.sizeCondition) {
            const size: number = input.length
            return this.sizeCondition.check(size)
        }
        throw 'ArrayCondition does not contain anything. Constructor should have thrown but did not.'
    }
}