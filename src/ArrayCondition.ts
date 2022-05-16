import { FieldValueCondition } from "./FieldValueCondition"
import { FilterArrayCondition } from "./FilterArrayCondition"
import { NumberCondition } from "./NumberCondition"
import { jsontype } from "./utils"

export class ArrayCondition {
    all?: ArrayCondition[]
    any?: ArrayCondition[]
    not?: ArrayCondition

    size?: NumberCondition
    hasElement?: FieldValueCondition
    hasNoElement?: FieldValueCondition
    filterArray?: FilterArrayCondition

    constructor(input: any) {
        if (jsontype(input) !== 'object') {
            throw 'input must be an object not array and not null'
        }
        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, size, hasElement, hasNoElement, filterArray'
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
                this.all.push(new ArrayCondition(cond))
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
                this.any.push(new ArrayCondition(cond))
            }
            oneConditionSpecified = true
        }

        if ('not' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const notValue: any = input['not']
            this.not = new ArrayCondition(notValue)
            oneConditionSpecified = true
        }

        if ('size' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const sizeValue: any = input['size']
            this.size = new NumberCondition(sizeValue)
            oneConditionSpecified = true
        }

        if ('hasElement' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const hasElementValue: any = input['hasElement']
            this.hasElement = new FieldValueCondition(hasElementValue)
            oneConditionSpecified = true
        }

        if ('hasNoElement' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const hasNoElementValue: any = input['hasNoElement']
            this.hasNoElement = new FieldValueCondition(hasNoElementValue)
            oneConditionSpecified = true
        }

        if ('filterArray' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const filterArrayValue: any = input['filterArray']
            this.filterArray = new FilterArrayCondition(filterArrayValue)
            oneConditionSpecified = true
        }

        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
        }
    }
    check(input: any): boolean {
        if (jsontype(input) !== 'array') {
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