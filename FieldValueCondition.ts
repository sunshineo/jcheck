import objectNotArrayNotNull from "./utils"

import StringCondition from "./StringCondition"
import NumberCondition from "./NumberCondition"
import ArrayCondition from "./ArrayCondition"
import ObjectCondition from "./ObjectCondition"
import ICondition from "./ICondition"
import BooleanCondition from "./BooleanCondition"

const allowedTypes = ["null", "boolean", "string", "number", "object", "array"]

export default class FieldValueCondition implements ICondition {
    allowedType: string
    booleanCondition?: BooleanCondition
    stringCondition?: StringCondition
    numberCondition?: NumberCondition
    objectCondition?: ObjectCondition
    arrayCondition?: ArrayCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }

        const allowedTypeValue = input['allowedType']
        if (typeof allowedTypeValue !== 'string' || !allowedTypes.includes(allowedTypeValue)) {
            throw 'Must specify allowedType as a string. Valid values are one of the 6 valid JSON types: null, boolean, string, number, object, array'
        }
        this.allowedType = allowedTypeValue

        const booleanCoditionValue: any = input['booleanCondition']
        if (booleanCoditionValue) {
            if (this.allowedType !== 'boolean') {
                throw 'Cannot specify booleanCondition when the allowedType is not boolean'
            }
            this.booleanCondition = new BooleanCondition(booleanCoditionValue)
        }

        const stringCoditionValue: any = input['stringCondition']
        if (stringCoditionValue) {
            if (this.allowedType !== 'string') {
                throw 'Cannot specify stringCondition when the allowedType is not string'
            }
            this.stringCondition = new StringCondition(stringCoditionValue)
        }

        const numberCoditionValue: any = input['stringCondition']
        if (numberCoditionValue) {
            if (this.allowedType !== 'number') {
                throw 'Cannot specify numberCondition when the allowedType is not number'    
            }
            this.numberCondition = new NumberCondition(numberCoditionValue)
        }

        const objectCoditionValue: any = input['stringCondition']
        if (objectCoditionValue) {
            if (this.allowedType !== 'object') {
                throw 'Cannot specify objectCondition when the allowedType is not object'    
            }
            this.objectCondition = new ObjectCondition(objectCoditionValue)
        }

        const arrayCoditionValue: any = input['stringCondition']
        if (arrayCoditionValue) {
            if (this.allowedType !== 'array') {
                throw 'Cannot specify arrayCondition when the allowedType is not array'    
            }
            this.arrayCondition = new ArrayCondition(arrayCoditionValue)
        }
    }

    check(fieldValue: any): boolean {
        if (!objectNotArrayNotNull(fieldValue)) {
            throw 'input must be an object not array and not null'
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
