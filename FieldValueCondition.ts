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
        if (this.allowedType === 'null') {
            return fieldValue === null
        }
        if (this.allowedType === 'boolean') {
            if (typeof fieldValue !== 'boolean') {
                return false
            }
            if (!this.booleanCondition) {
                return true
            }
            return this.booleanCondition.check(fieldValue)
        }
        if (this.allowedType === 'string') {
            if (typeof fieldValue !== 'string') {
                return false
            }
            if (!this.stringCondition) {
                return true
            }
            // has required condition on the string
            return this.stringCondition.check(fieldValue)
        }
        if (this.allowedType === 'number') {
            if (typeof fieldValue !== 'number') {
                return false
            }
            if (!this.numberCondition) {
                return true
            }
            return this.numberCondition.check(fieldValue)
        }
        if (this.allowedType === 'array') {
            if (!Array.isArray(fieldValue)) {
                return false
            }
            if (!this.arrayCondition) {
                return true
            }
            return this.arrayCondition.check(fieldValue)
        }
        if (this.allowedType === 'object') {
            if (!objectNotArrayNotNull(fieldValue)) {
                return false
            }
            if (!this.objectCondition) {
                return true
            }
            // has required condition on the object
            return this.objectCondition.check(fieldValue)
        }
        throw `Allowed type ${this.allowedType} is not one of the 6 valid JSON types: null, boolean, string, number, object, array. Constructor should have thrown but did not.`
    }
}
