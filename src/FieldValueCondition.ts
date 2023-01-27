import { jsontype } from "./utils"

import { StringCondition } from "./StringCondition"
import { NumberCondition } from "./NumberCondition"
import { ArrayCondition } from "./ArrayCondition"
import { ObjectCondition } from "./ObjectCondition"
import { BooleanCondition } from "./BooleanCondition"
import { DateCondition } from "./DateCondition"

const isTypes = ["undefined", "null", "boolean", "string", "number", "object", "array", "date"]

export class FieldValueCondition {
    isType: string
    booleanCondition?: BooleanCondition
    stringCondition?: StringCondition
    numberCondition?: NumberCondition
    objectCondition?: ObjectCondition
    arrayCondition?: ArrayCondition
    dateCondition?: DateCondition

    constructor(input: any) {
        if (jsontype(input) !== 'object') {
            throw 'input must be an object not array and not null'
        }

        const isTypeValue = input['isType']
        if (typeof isTypeValue !== 'string' || !isTypes.includes(isTypeValue)) {
            throw 'Must specify isType as a string. Valid values are one of the 6 valid JSON types: null, boolean, string, number, object, array'
        }
        this.isType = isTypeValue

        const booleanCoditionValue: any = input['booleanCondition']
        if (booleanCoditionValue) {
            if (this.isType !== 'boolean') {
                throw 'Cannot specify booleanCondition when the isType is not boolean'
            }
            this.booleanCondition = new BooleanCondition(booleanCoditionValue)
        }

        const stringCoditionValue: any = input['stringCondition']
        if (stringCoditionValue) {
            if (this.isType !== 'string') {
                throw 'Cannot specify stringCondition when the isType is not string'
            }
            this.stringCondition = new StringCondition(stringCoditionValue)
        }

        const numberCoditionValue: any = input['numberCondition']
        if (numberCoditionValue) {
            if (this.isType !== 'number') {
                throw 'Cannot specify numberCondition when the isType is not number'    
            }
            this.numberCondition = new NumberCondition(numberCoditionValue)
        }

        const objectCoditionValue: any = input['objectCondition']
        if (objectCoditionValue) {
            if (this.isType !== 'object') {
                throw 'Cannot specify objectCondition when the isType is not object'    
            }
            this.objectCondition = new ObjectCondition(objectCoditionValue)
        }

        const arrayCoditionValue: any = input['arrayCondition']
        if (arrayCoditionValue) {
            if (this.isType !== 'array') {
                throw 'Cannot specify arrayCondition when the isType is not array'    
            }
            this.arrayCondition = new ArrayCondition(arrayCoditionValue)
        }

        const dateCoditionValue: any = input['dateCondition']
        if (arrayCoditionValue) {
            if (this.isType !== 'date') {
                throw 'Cannot specify dateCondition when the isType is not date'
            }
            this.dateCondition = new DateCondition(dateCoditionValue)
        }
    }

    check(input: any): boolean {
        if (this.isType === 'undefined') {
            return input === undefined
        }
        if (this.isType === 'null') {
            return input === null
        }
        if (this.isType === 'boolean') {
            if (jsontype(input) !== 'boolean') {
                return false
            }
            if (!this.booleanCondition) {
                return true
            }
            return this.booleanCondition.check(input)
        }
        if (this.isType === 'string') {
            if (jsontype(input) !== 'string') {
                return false
            }
            if (!this.stringCondition) {
                return true
            }
            // has required condition on the string
            return this.stringCondition.check(input)
        }
        if (this.isType === 'number') {
            if (jsontype(input) !== 'number') {
                return false
            }
            if (!this.numberCondition) {
                return true
            }
            return this.numberCondition.check(input)
        }
        if (this.isType === 'array') {
            if (jsontype(input) !== 'array') {
                return false
            }
            if (!this.arrayCondition) {
                return true
            }
            return this.arrayCondition.check(input)
        }
        if (this.isType === 'object') {
            if (jsontype(input) !== 'object') {
                return false
            }
            if (!this.objectCondition) {
                return true
            }
            // has required condition on the object
            return this.objectCondition.check(input)
        }
        if (this.isType === 'date') {
            if (jsontype(input) !== 'string') {
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
        throw `Allowed type ${this.isType} is not one of the 6 valid JSON types: null, boolean, string, number, object, array and not one of custom supported: date. Constructor should have thrown but did not.`
    }
}
