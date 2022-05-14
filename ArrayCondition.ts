import FieldValueCondition from "./FieldValueCondition"
import FilterArrayCondition from "./FilterArrayCondition"
import NumberCondition from "./NumberCondition"
import { objectNotArrayNotNull } from "./utils"

export default class ArrayCondition {
    all?: ArrayCondition[]
    any?: ArrayCondition[]
    not?: ArrayCondition

    size?: NumberCondition
    hasElement?: FieldValueCondition
    hasNoElement?: FieldValueCondition
    filterArray?: FilterArrayCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, size, hasElement, hasNoElement, filterArray'
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

        const sizeValue: any = input['size']
        if (sizeValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.size = new NumberCondition(sizeValue)
            oneConditionSpecified = true
        }

        const hasElementValue: any = input['hasElement']
        if (hasElementValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.hasElement = new FieldValueCondition(hasElementValue)
            oneConditionSpecified = true
        }

        const hasNoElementValue: any = input['hasNoElement']
        if (hasNoElementValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.hasNoElement = new FieldValueCondition(hasNoElementValue)
            oneConditionSpecified = true
        }

        const filterArrayValue: any = input['filterArray']
        if (filterArrayValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.filterArray = new FilterArrayCondition(filterArrayValue)
            oneConditionSpecified = true
        }

        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
        }
    }
    check(input: any): boolean {
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
        if (this.size) {
            const size: number = input.length
            return this.size.check(size)
        }

        if (this.hasElement) {
            for (const element of input) {
                if (this.hasElement.check(element)) {
                    return true
                }
            }
            return false
        }

        if (this.hasNoElement) {
            for (const element of input) {
                if (this.hasNoElement.check(element)) {
                    return false
                }
            }
            return true
        }

        if (this.filterArray) {
            return this.filterArray.check(input)
        }
        throw 'ArrayCondition does not contain anything. Constructor should have thrown but did not.'
    }
}