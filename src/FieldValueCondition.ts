import { objectNotArrayNotNull } from "./utils"

import StringCondition from "./StringCondition"
import NumberCondition from "./NumberCondition"
import ArrayCondition from "./ArrayCondition"
import ObjectCondition from "./ObjectCondition"
import BooleanCondition from "./BooleanCondition"
import DateCondition from "./DateCondition"

const allowedTypes = ["null", "boolean", "string", "number", "object", "array", "date"]

export default class FieldValueCondition {
    allowedType: string
    booleanCondition?: BooleanCondition
    stringCondition?: StringCondition
    numberCondition?: NumberCondition
    objectCondition?: ObjectCondition
    arrayCondition?: ArrayCondition
    dateCondition?: DateCondition

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

        const numberCoditionValue: any = input['numberCondition']
        if (numberCoditionValue) {
            if (this.allowedType !== 'number') {
                throw 'Cannot specify numberCondition when the allowedType is not number'    
            }
            this.numberCondition = new NumberCondition(numberCoditionValue)
        }

        const objectCoditionValue: any = input['objectCondition']
        if (objectCoditionValue) {
            if (this.allowedType !== 'object') {
                throw 'Cannot specify objectCondition when the allowedType is not object'    
            }
            this.objectCondition = new ObjectCondition(objectCoditionValue)
        }

        const arrayCoditionValue: any = input['arrayCondition']
        if (arrayCoditionValue) {
            if (this.allowedType !== 'array') {
                throw 'Cannot specify arrayCondition when the allowedType is not array'    
            }
            this.arrayCondition = new ArrayCondition(arrayCoditionValue)
        }

        const dateCoditionValue: any = input['dateCondition']
        if (arrayCoditionValue) {
            if (this.allowedType !== 'date') {
                throw 'Cannot specify dateCondition when the allowedType is not date'
            }
            this.dateCondition = new DateCondition(dateCoditionValue)
        }
    }

    check(input: any): boolean {
        if (this.allowedType === 'null') {
            return input === null
        }
        if (this.allowedType === 'boolean') {
            if (typeof input !== 'boolean') {
                return false
            }
            if (!this.booleanCondition) {
                return true
            }
            return this.booleanCondition.check(input)
        }
        if (this.allowedType === 'string') {
            if (typeof input !== 'string') {
                return false
            }
            if (!this.stringCondition) {
                return true
            }
            // has required condition on the string
            return this.stringCondition.check(input)
        }
        if (this.allowedType === 'number') {
            if (typeof input !== 'number') {
                return false
            }
            if (!this.numberCondition) {
                return true
            }
            return this.numberCondition.check(input)
        }
        if (this.allowedType === 'array') {
            if (!Array.isArray(input)) {
                return false
            }
            if (!this.arrayCondition) {
                return true
            }
            return this.arrayCondition.check(input)
        }
        if (this.allowedType === 'object') {
            if (!objectNotArrayNotNull(input)) {
                return false
            }
            if (!this.objectCondition) {
                return true
            }
            // has required condition on the object
            return this.objectCondition.check(input)
        }
        if (this.allowedType === 'date') {
            if (typeof input !== 'string') {
                return false
            }
            const inputDate = new Date(input)
            if (isNaN(inputDate.getTime())) {
                return false
            }
            if (!this.dateCondition) {
                return true
            }
            return this.dateCondition.check(inputDate)
        }
        throw `Allowed type ${this.allowedType} is not one of the 6 valid JSON types: null, boolean, string, number, object, array. Constructor should have thrown but did not.`
    }
}
