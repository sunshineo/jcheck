import { jsontype } from "./utils"

export class DateCondition {
    all?: DateCondition[]
    any?: DateCondition[]
    not?: DateCondition

    before?: Date
    after?: Date

    constructor(input: any) {
        if (jsontype(input) !== 'object') {
            throw 'input must be an object not array and not null'
        }

        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, before, after'
        if ('all' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const allValue: any = input['all']
            if (jsontype(allValue) !== 'array') {
                throw '"all" must be an array'
            }
            if (allValue.length === 0) {
                throw '"all" array cannot be empty'
            }
            this.all = []
            for(const cond of allValue) {
                this.all.push(new DateCondition(cond))
            }
            oneConditionSpecified = true
        }
        
        if ('any' in input) {
            const anyValue: any = input['any']
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (jsontype(anyValue) !== 'array') {
                throw '"any" must be an array'
            }
            if (anyValue.length === 0) {
                throw '"any" array cannot be empty'
            }
            this.any = []
            for(const cond of anyValue) {
                this.any.push(new DateCondition(cond))
            }
            oneConditionSpecified = true
        }

        if ('not' in input) {
            const notValue: any = input['not']
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.not = new DateCondition(notValue)
            oneConditionSpecified = true
        }

        const beforeValue = input['before']
        if (beforeValue !== undefined) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof beforeValue !== 'string') {
                throw 'before must be a string'
            }
            this.before = new Date(beforeValue)
            if (isNaN(this.before.getTime())) {
                throw 'before must be a string representing date'
            }
            oneConditionSpecified = true
        }
        const afterValue = input['after']
        if (afterValue !== undefined) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof afterValue !== 'string') {
                throw 'after must be a string'
            }
            this.after = new Date(afterValue)
            if (isNaN(this.after.getTime())) {
                throw 'after must be a string representing date'
            }
            oneConditionSpecified = true
        }

        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
        }
    }
    check(input: any): boolean {
        if (typeof input !== 'string') {
            return false
        }
        if (this.all) {
            for (const childCondition of this.all) {
                if (!childCondition.check(input)) {
                    return false
                }
            }
            return true
        }
        if (this.any) {
            for (const childCondition of this.any) {
                if (childCondition.check(input)) {
                    return true
                }
            }
            return false
        }
        if (this.not) {
            return !this.not.check(input)
        }
        
        const inputDate = new Date(input)
        if (isNaN(inputDate.getTime())) {
            return false
        }

        if (this.before) {
            return inputDate < this.before
        }

        if (this.after) {
            return inputDate > this.after
        }

        throw 'NumberConditon does not contain anything. Constructor should have thrown but did not.'
    }
}
