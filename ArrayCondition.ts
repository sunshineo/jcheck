import NumberCondition from "./NumberCondition"
import objectNotArrayNotNull from "./utils"

export default class ArrayCondition {
    sizeCondition: NumberCondition
    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        let oneConditionSpecified: boolean = false
        const sizeConditionValue: any = input['sizeCondition']
        if (sizeConditionValue) {
            this.sizeCondition = new NumberCondition(sizeConditionValue)
            oneConditionSpecified = true
        }
        if (!oneConditionSpecified) {
            throw 'Must specify one and only one of: sizeCondition'
        }
    }
    check(input: any) {
        if (!Array.isArray(input)) {
            throw 'input must be an array'
        }
        if (this.sizeCondition) {
            const size: number = input.length
            return this.sizeCondition.check(size)
        }
        throw 'ArrayCondition does not contain anything. Constructor should have thrown but did not.'
    }
}