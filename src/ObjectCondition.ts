import { jsontype } from "./utils"
import { FieldCondition } from "./FieldCondition"
import { ArrayCondition } from "./ArrayCondition"

export class ObjectCondition {
    all?: ObjectCondition[]
    any?: ObjectCondition[]
    not?: ObjectCondition

    field?: FieldCondition
    fieldNames?: ArrayCondition
    fieldValues?: ArrayCondition

    constructor(input: any) {
        if (jsontype(input) !== 'object') {
            throw 'input must be an object not array and not null'
        }
        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, or field, fieldNames, fieldValues'
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
                this.all.push(new ObjectCondition(cond))
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
                this.any.push(new ObjectCondition(cond))
            }
            oneConditionSpecified = true
        }

        if ('not' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const notValue: any = input['not']
            this.not = new ObjectCondition(notValue)
            oneConditionSpecified = true
        }

        if ('field' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const fieldValue: any = input['field']
            oneConditionSpecified = true
            this.field = new FieldCondition(fieldValue)
        }

        if ('fieldNames' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const fieldNamesValue: any = input['fieldNames']
            oneConditionSpecified = true
            this.fieldNames = new ArrayCondition(fieldNamesValue)
        }

        if ('fieldValues' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const fieldValuesValue: any = input['fieldValues']
            oneConditionSpecified = true
            this.fieldValues = new ArrayCondition(fieldValuesValue)
        }
        
        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
        }
    }

    check(input: any): boolean {
        if (jsontype(input) !== 'object') {
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
        if (this.field) {
            return this.field.check(input)
        }
        if (this.fieldNames) {
            return this.fieldNames.check(Object.keys(input))
        }
        if (this.fieldValues) {
            return this.fieldValues.check(Object.values(input))
        }
        throw 'ObjectConditon does not contain anything. Constructor should have thrown but did not.'
    }
}