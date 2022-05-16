import { jsontype } from "./utils"
import { FieldValueCondition } from "./FieldValueCondition"

export class FieldCondition {
    fieldName: string
    fieldValue?: FieldValueCondition
    all?: FieldValueCondition[]
    any?: FieldValueCondition[]
    not?: FieldValueCondition

    constructor(input: any) {
        if (jsontype(input) !== 'object') {
            throw 'input must be an object not array and not null'
        }
        const fieldNameValue: any = input['fieldName']
        if (jsontype(fieldNameValue) !== 'string') {
            throw 'Must provide fieldName as a string'
        }
        this.fieldName = fieldNameValue

        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: fieldValue, all, any, not'

        const feildValueValue: any = input['fieldValue']
        if (feildValueValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.fieldValue = new FieldValueCondition(feildValueValue)
            oneConditionSpecified = true
        }
        
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
                this.all.push(new FieldValueCondition(cond))
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
                this.any.push(new FieldValueCondition(cond))
            }
            oneConditionSpecified = true
        }

        if ('not' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const notValue: any = input['not']
            this.not = new FieldValueCondition(notValue)
            oneConditionSpecified = true
        }

        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
        }
    }

    check(input: any): boolean {
        if (jsontype(input) !== 'object') {
            return false
        }
        const fieldValue: any = input[this.fieldName]
        if (this.fieldValue) {
            return this.fieldValue.check(fieldValue)
        }
        if (this.all) {
            for (const childCondition of this.all) {
                if (!childCondition.check(fieldValue)) {
                    return false
                }
            }
            return true
        }
        if (this.any) {
            for (const childCondition of this.any) {
                if (childCondition.check(fieldValue)) {
                    return true
                }
            }
            return false
        }
        if (this.not) {
            return !this.not.check(fieldValue)
        }
        throw 'FieldConditon does not contain anything. Constructor should have thrown but did not.'
    }
}
