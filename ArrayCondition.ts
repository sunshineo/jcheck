import FieldValueCondition from "./FieldValueCondition"
import FilterArrayCondition from "./FilterArrayCondition"
import NumberCondition from "./NumberCondition"
import objectNotArrayNotNull from "./utils"

export default class ArrayCondition {
    all?: ArrayCondition[]
    any?: ArrayCondition[]
    not?: ArrayCondition

    sizeCondition?: NumberCondition
    hasElementCondition?: FieldValueCondition
    hasNoElementCondition?: FieldValueCondition
    filterArrayCondition?: FilterArrayCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, sizeCondition, hasElement, hasNoElement, filterArrayCondition'
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
                this.all.push(new ArrayCondition(cond))
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
                this.any.push(new ArrayCondition(cond))
            }
        }

        const notValue: any = input['not']
        if (notValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.not = new ArrayCondition(notValue)
            oneConditionSpecified = true
        }

        const sizeConditionValue: any = input['sizeCondition']
        if (sizeConditionValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.sizeCondition = new NumberCondition(sizeConditionValue)
            oneConditionSpecified = true
        }

        const hasElementConditionValue: any = input['hasElementCondition']
        if (hasElementConditionValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.hasElementCondition = new FieldValueCondition(hasElementConditionValue)
            oneConditionSpecified = true
        }

        const hasNoElementConditionValue: any = input['hasNoElementCondition']
        if (hasNoElementConditionValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.hasNoElementCondition = new FieldValueCondition(hasNoElementConditionValue)
            oneConditionSpecified = true
        }

        const filterArrayConditionValue: any = input['filterArrayCondition']
        if (filterArrayConditionValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.filterArrayCondition = new FilterArrayCondition(filterArrayConditionValue)
            oneConditionSpecified = true
        }

        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
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

        if (this.hasElementCondition) {
            for (const element of input) {
                if (this.hasElementCondition.check(element)) {
                    return true
                }
            }
            return false
        }

        if (this.hasNoElementCondition) {
            for (const element of input) {
                if (this.hasNoElementCondition.check(element)) {
                    return false
                }
            }
            return true
        }

        if (this.filterArrayCondition) {
            return this.filterArrayCondition.check(input)
        }
        throw 'ArrayCondition does not contain anything. Constructor should have thrown but did not.'
    }
}