import { objectNotArrayNotNull } from "./utils"
import FieldValueCondition from "./FieldValueCondition"
import NumberCondition from "./NumberCondition"

export default class FilterArrayCondition {
    passFilterCount: NumberCondition
    elementFilter: FieldValueCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }
        const passFilterCountValue: any = input['passFilterCount']
        if (!objectNotArrayNotNull(passFilterCountValue)) {
            throw 'passFilterCount must be an object not array and not null'
        }
        this.passFilterCount = new NumberCondition(this.passFilterCount)

        const elementFilterValue: any = input['elementFilter']
        if (!objectNotArrayNotNull(elementFilterValue)) {
            throw 'elementFilter must be an object not array and not null'
        }
        this.elementFilter = new FieldValueCondition(elementFilterValue)
    }

    check(input: any): boolean {
        if (!Array.isArray(input)) {
            throw 'input must be an array'
        }
        let size = 0
        for (const element of input) {
            if (this.elementFilter.check(element)) {
                size ++
            }
        }
        return this.passFilterCount.check(size)
    }
}
