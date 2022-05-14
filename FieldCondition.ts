import objectNotArrayNotNull from "./utils"
import FieldValueCondition from "./FieldValueCondition"

export default class FieldCondition {
    fieldName: string
    fieldValue: FieldValueCondition

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

        const fieldValueValue = input['fieldValue']
        if (!fieldValueValue) {
            throw 'Must provide fieldValue'
        }
        if (!objectNotArrayNotNull(fieldValueValue)) {
            throw 'fieldValue must be an object not array and not null'
        }
        this.fieldValue = new FieldValueCondition(fieldValueValue)
    }

    check(input: any): boolean {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        const fieldValue: any = input[this.fieldName]
        return this.fieldValue.check(fieldValue)
    }
}
