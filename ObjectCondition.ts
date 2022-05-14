import objectNotArrayNotNull from "./utils"
import FieldCondition from "./FieldCondition"

export default class ObjectCondition {
    all?: ObjectCondition[]
    any?: ObjectCondition[]
    not?: ObjectCondition

    // keysCondition?: ArrayCondition
    // valuesCondition?: ArrayCondition
    fieldCondition?: FieldCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull) {
            throw 'input must be an object not array and not null'
        }
        let oneConditionSpecified: boolean = false
        const allArray: any = input['all']
        if (allArray) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or valueCondition'
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
                throw 'Can only have one of: all, any, not, or valueCondition'
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
                throw 'Can only have one of: all, any, not, or valueCondition'
            }
            oneConditionSpecified = true
            this.not = new ObjectCondition(notValue)
        }

        const fieldConditionValue: any = input['fieldCondition']
        if (fieldConditionValue) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or valueCondition'
            }
            oneConditionSpecified = true
            this.fieldCondition = new FieldCondition(fieldConditionValue)
        }
        if (!oneConditionSpecified) {
            throw 'Must specify one and only one of: all, any, not, or fieldCondition'
        }
    }

    check(input: any): boolean {
        if (!objectNotArrayNotNull) {
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
        if (this.fieldCondition) {
            return this.fieldCondition.check(input)
        }
        throw 'ObjectConditon does not contain anything. Constructor should have thrown but did not.'
    }
}