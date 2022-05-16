import { objectNotArrayNotNull } from "./utils"
import FieldValueCondition from "./FieldValueCondition"

export default class FieldCondition {
    fieldName: string
    fieldValue?: FieldValueCondition
    all?: FieldValueCondition[]
    any?: FieldValueCondition[]
    not?: FieldValueCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        const fieldNameValue: any = input['fieldName']
        if (typeof fieldNameValue !== 'string') {
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
                this.all.push(new FieldValueCondition(cond))
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
                this.any.push(new FieldValueCondition(cond))
            }
        }

        const notValue: any = input['not']
        if (notValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            oneConditionSpecified = true
            this.not = new FieldValueCondition(notValue)
        }

        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
        }
    }

    check(input: any): boolean {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
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
