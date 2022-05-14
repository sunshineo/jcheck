import objectNotArrayNotNull from "./utils"
import FieldCondition from "./FieldCondition"
import ArrayCondition from "./ArrayCondition"
import ICondition from "./ICondition"

export default class ObjectCondition implements ICondition {
    all?: ObjectCondition[]
    any?: ObjectCondition[]
    not?: ObjectCondition

    field?: FieldCondition
    fieldNames?: ArrayCondition
    fieldValues?: ArrayCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, or field, fieldNames, fieldValues'
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
                this.all.push(new ObjectCondition(cond))
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
                this.any.push(new ObjectCondition(cond))
            }
        }

        const notValue: any = input['not']
        if (notValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            oneConditionSpecified = true
            this.not = new ObjectCondition(notValue)
        }

        const fieldValue: any = input['field']
        if (fieldValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            oneConditionSpecified = true
            this.field = new FieldCondition(fieldValue)
        }

        const fieldNamesValue: any = input['fieldNames']
        if (fieldNamesValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            oneConditionSpecified = true
            this.fieldNames = new ArrayCondition(fieldNamesValue)
        }

        const fieldValuesValue: any = input['fieldValues']
        if (fieldValuesValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            oneConditionSpecified = true
            this.fieldValues = new ArrayCondition(fieldValuesValue)
        }
        
        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
        }
    }

    check(input: any): boolean {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
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
        throw 'ObjectConditon does not contain anything. Constructor should have thrown but did not.'
    }
}