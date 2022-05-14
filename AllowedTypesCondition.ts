import objectNotArrayNotNull from "./utils"

export default class AllowedTypesCondition {
    allowNull: boolean = false
    allowBoolean: boolean = false
    allowString: boolean = false
    allowNumber: boolean = false
    // allowObject: boolean = false
    // allowArray: boolean = false

    constructor(input: any) {
        if (!objectNotArrayNotNull) {
            throw 'input must be an object not array and not null'
        }
        const allowNullValue: any = input['allowNull']
        if (allowNullValue) {
            if (typeof allowNullValue !== 'boolean') {
                throw 'allowNull must be a boolean value'
            }
            this.allowNull = allowNullValue
        }
        const allowBooleanValue: any = input['allowBoolean']
        if (allowBooleanValue) {
            if (typeof allowBooleanValue !== 'boolean') {
                throw 'allowBoolean must be a boolean value'
            }
            this.allowBoolean = allowBooleanValue
        }
        const allowStringValue: any = input['allowString']
        if (allowStringValue) {
            if (typeof allowStringValue !== 'boolean') {
                throw 'allowString must be a boolean value'
            }
            this.allowString = allowStringValue
        }
        const allowNumberValue: any = input['allowNumber']
        if (allowNumberValue) {
            if (typeof allowNumberValue !== 'boolean') {
                throw 'allowNumber must be a boolean value'
            }
            this.allowNumber = allowNumberValue
        }
    }
}
