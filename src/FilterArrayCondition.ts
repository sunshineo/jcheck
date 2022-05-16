import { jsontype } from "./utils"
import { FieldValueCondition } from "./FieldValueCondition"
import { NumberCondition } from "./NumberCondition"

export class FilterArrayCondition {
    passFilterCount: NumberCondition
    elementFilter: FieldValueCondition

    constructor(input: any) {
        if (jsontype(input) !== 'object') {
            throw 'input must be an object not array and not null'
        }
        const passFilterCountValue: any = input['passFilterCount']
        if (jsontype(passFilterCountValue) !== 'object') {
            throw 'passFilterCount must be an object not array and not null'
        }
        this.passFilterCount = new NumberCondition(passFilterCountValue)

        const elementFilterValue: any = input['elementFilter']
        if (jsontype(elementFilterValue) !== 'object') {
            throw 'elementFilter must be an object not array and not null'
        }
        this.elementFilter = new FieldValueCondition(elementFilterValue)
    }

    check(input: any): boolean {
        if (jsontype(input) !== 'array') {
            return false
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
