import objectNotArrayNotNull from "./utils"
import FieldValueCondition from "./FieldValueCondition"
import ICondition from "./ICondition"

export default class FieldCondition implements ICondition {
    fieldName: string
    fieldValue: FieldValueCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        const fieldNameValue: any = input['fieldName']
        if (typeof fieldNameValue !== 'string') {
            throw 'Must provide fieldName as a string'
        }
        this.fieldName = fieldNameValue

        const fieldValueValue = input['fieldValue']
        if (!objectNotArrayNotNull(fieldValueValue)) {
            throw 'Must provide fieldValue as an object for FieldValueConditon the field value must pass'
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
