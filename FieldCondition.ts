import objectNotArrayNotNull from "./utils"

import AllowedTypesCondition from "./AllowedTypesCondition"

import StringCondition from "./StringCondition"
import NumberCondition from "./NumberCondition"
import ArrayCondition from "./ArrayCondition"
import ObjectCondition from "./ObjectCondition"

export default class FieldCondition {
    fieldName: string
    allowedTypes?: AllowedTypesCondition
    stringCondition?: StringCondition
    numberCondition?: NumberCondition
    objectCondition?: ObjectCondition
    arrayCondition?: ArrayCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        const fieldNameValue: any = input['fieldName']
        if (!fieldNameValue) {
            throw 'Must provide fieldName'
        }
        if (typeof fieldNameValue !== 'string') {
            throw 'fieldName must be string'
        }
        this.fieldName = fieldNameValue

        let oneConditionSpecified: boolean = false
        const allowedTypesValue: any = input['allowedTypes']
        if (allowedTypesValue) {
            this.allowedTypes = new AllowedTypesCondition(allowedTypesValue)
            oneConditionSpecified = true
        }

        const stringCoditionValue: any = input['stringCondition']
        if (stringCoditionValue) {
            this.stringCondition = new StringCondition(stringCoditionValue)
            oneConditionSpecified = true
        }

        const numberCoditionValue: any = input['numberCondition']
        if (numberCoditionValue) {
            this.numberCondition = new NumberCondition(numberCoditionValue)
            oneConditionSpecified = true
        }

        if (!oneConditionSpecified) {
            throw 'Must specify one of: allowedTypes, stringCondition, numberCondition'
        }
    }

    check(input: any): boolean {
        if (!objectNotArrayNotNull) {
            throw 'input must be an object not array and not null'
        }
        const fieldValue: any = input[this.fieldName]
        // This contains both null and key does not exists right now
        // Will separate later using keys array
        if (!fieldValue) {
            // null not allowed
            if (this.allowedTypes && !this.allowedTypes?.allowNull) {
                return false
            }
            // null allowed
            return true
        }
        const fieldType: string = typeof fieldValue
        if (fieldType === 'boolean') {
            // boolean not allowed
            if (this.allowedTypes && !this.allowedTypes?.allowBoolean) {
                return false
            }
            // boolean allowed
            return fieldValue
        }
        if (fieldType === 'string') {
            // string not allowed
            if (this.allowedTypes && !this.allowedTypes?.allowString) {
                return false
            }
            // string allowed
            // no required condition on the string
            if (!this.stringCondition) {
                return true
            }
            // has required condition on the string
            return this.stringCondition.check(fieldValue)
        }
        if (fieldType === 'number') {
            // number not allowed
            if (this.allowedTypes && !this.allowedTypes?.allowNumber) {
                return false
            }
            // number allowed
            // no required condition on the number
            if (!this.numberCondition) {
                return true
            }
            // has required condition on the number
            return this.numberCondition.check(fieldValue)
        }
        if (fieldType === 'object') {
            // not array
            if (!Array.isArray(fieldValue)) {
                // no required condition on the object
                if (!this.objectCondition) {
                    return true
                }
                // has required condition on the object
                return this.objectCondition.check(fieldValue)
            }
            // array
            // no required condition on the array
            if (!this.arrayCondition) {
                return true
            }
            // has required condition on the array
            return this.arrayCondition.check(fieldValue)
        }
        throw `We do not support field type ${fieldType}`
    }
}
