import objectNotArrayNotNull from "./utils"
import FieldValueCondition from "./FieldValueCondition"

export default class FieldCondition {
    fieldName: string
    fieldValueCondition: FieldValueCondition

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

        const fieldValueConditionValue = input['fieldValueCondition']
        if (!fieldValueConditionValue) {
            throw 'Must provide fieldValueCondition'
        }
        if (!objectNotArrayNotNull(fieldValueConditionValue)) {
            throw 'fieldValueCondition must be an object not array and not null'
        }
        this.fieldValueCondition = new FieldValueCondition(fieldValueConditionValue)
    }

    check(input: any): boolean {
        if (!objectNotArrayNotNull) {
            throw 'input must be an object not array and not null'
        }
        const fieldValue: any = input[this.fieldName]
        return this.fieldValueCondition.check(fieldValue)
    }
}
