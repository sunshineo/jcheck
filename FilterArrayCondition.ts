import objectNotArrayNotNull from "./utils"
import FieldValueCondition from "./FieldValueCondition"
import NumberCondition from "./NumberCondition"

export default class FilterArrayCondition {
    passFilterCountCondition: NumberCondition
    elementFilterCondition: FieldValueCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        const passFilterCountValue: any = input['passFilterCount']
        if (!objectNotArrayNotNull(passFilterCountValue)) {
            throw 'passFilterCount must be an object not array and not null'
        }
        this.passFilterCountCondition = new NumberCondition(this.passFilterCountCondition)

        const elementFilterValue: any = input['elementFilter']
        if (!objectNotArrayNotNull(elementFilterValue)) {
            throw 'elementFilter must be an object not array and not null'
        }
        this.elementFilterCondition = new FieldValueCondition(elementFilterValue)
    }

    check(input: any): boolean {
        if (!Array.isArray(input)) {
            throw 'input must be an array'
        }
        let size = 0
        for (const element of input) {
            if (this.elementFilterCondition.check(element)) {
                size ++
            }
        }
        return this.passFilterCountCondition.check(size)
    }
}
