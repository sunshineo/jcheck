import { jsontype } from "./utils"
import { NumberCondition } from "./NumberCondition"

export class StringCondition {
    all?: StringCondition[]
    any?: StringCondition[]
    not?: StringCondition

    caseInsensitive: boolean = false
    lengthCondition?: NumberCondition
    eq?: string
    ne?: string
    startsWith?: string
    endsWith?: string
    regex?: RegExp

    constructor(input: any) {
        if (jsontype(input) !== 'object') {
            throw 'input must be an object not array and not null'
        }

        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, lengthCondition, eq, ne, startsWith, endWith, regex'
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
                this.all.push(new StringCondition(cond))
            }
            oneConditionSpecified = true
        }
        
        if ('any' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const anyValue: any = input['any']
            if (jsontype(anyValue) !== 'array') {
                throw '"any" must be an array'
            }
            if (anyValue.length === 0) {
                throw '"any" array cannot be empty'
            }
            this.any = []
            for(const cond of anyValue) {
                this.any.push(new StringCondition(cond))
            }
            oneConditionSpecified = true
        }

        if ('not' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const notValue: any = input['not']
            this.not = new StringCondition(notValue)
            oneConditionSpecified = true
        }

        const caseInsensitiveValue = input['caseInsensitive']
        if (caseInsensitiveValue) {
            if (jsontype(caseInsensitiveValue) !== 'boolean') {
                throw 'caseInsensitive must be a boolean'
            }
            this.caseInsensitive = caseInsensitiveValue
        }

        const lengthConditionValue = input['lengthCondition']
        if (lengthConditionValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.lengthCondition = new NumberCondition(lengthConditionValue)
            oneConditionSpecified = true
        }

        if ('eq' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const eqValue = input['eq']
            if (jsontype(eqValue) !== 'string') {
                throw 'eq must be a string'
            }
            this.eq = eqValue
            if (this.caseInsensitive) {
                this.eq = eqValue.toLocaleLowerCase()
            }
            oneConditionSpecified = true
        }
        if ('ne' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const neValue = input['ne']
            if (jsontype(neValue) !== 'string') {
                throw 'ne must be a string'
            }
            this.ne = neValue
            if (this.caseInsensitive) {
                this.ne = neValue.toLocaleLowerCase()
            }
            oneConditionSpecified = true
        }
        if ('startsWith' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const startsWithValue = input['startsWith']
            if (jsontype(startsWithValue) !== 'string') {
                throw 'startsWith must be a string'
            }
            this.startsWith = startsWithValue
            if (this.caseInsensitive) {
                this.startsWith = startsWithValue.toLocaleLowerCase()
            }
            oneConditionSpecified = true
        }
        if ('endsWith' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const endsWithValue = input['endsWith']
            if (jsontype(endsWithValue) !== 'string') {
                throw 'endsWith must be a string'
            }
            this.endsWith = endsWithValue
            if (this.caseInsensitive) {
                this.endsWith = endsWithValue.toLocaleLowerCase()
            }
            oneConditionSpecified = true
        }
        if ('regex' in input) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            const regexValue = input['regex']
            if (jsontype(regexValue) !== 'string') {
                throw 'regex must be a string'
            }
            try {
                if (this.caseInsensitive) {
                    this.regex = new RegExp(regexValue, 'i')
                }
                else {
                    this.regex = new RegExp(regexValue)
                }
            } catch(e) {
                throw 'Provided string is not a valid regex'
            }
            oneConditionSpecified = true
        }
        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
        }
    }
    check(input: any): boolean {
        if (jsontype(input) !== 'string') {
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

        if (this.caseInsensitive) {
            input = input.toLocaleLowerCase()
        }

        if (this.lengthCondition) {
            return this.lengthCondition.check(input.length)
        }
        if (this.eq) {
            return input === this.eq
        }
        if (this.ne) {
            return input !== this.ne
        }
        if (this.startsWith) {
            return input.startsWith(this.startsWith)
        }
        if (this.endsWith) {
            return input.endsWith(this.endsWith)
        }
        if (this.regex) {
            return this.regex.test(input)
        }
        throw 'StringConditon does not contain anything. Constructor should have thrown but did not.'
    }
}
