import objectNotArrayNotNull from "./utils"
import NumberCondition from "./NumberCondition"

export default class StringCondition {
    all?: StringCondition[]
    any?: StringCondition[]
    not?: StringCondition

    caseInsensitive: boolean = false
    lengthCondition?: NumberCondition
    eq?: string
    neq?: string
    startsWith?: string
    endsWith?: string
    regex?: RegExp

    constructor(input: any) {
        if (!objectNotArrayNotNull(input)) {
            throw 'input must be an object not array and not null'
        }

        let oneConditionSpecified: boolean = false
        const oneAndOnlyOneMsg = 'Must have one and only one of: all, any, not, lengthCondition, eq, neq, startsWith, endWith, regex'
        const allArray: any = input['all']
        if (allArray) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            oneConditionSpecified = true
            if (!Array.isArray(allArray)) {
                throw '"all" must be an array'
            }
            if (allArray.length === 0) {
                throw '"all" array cannot be empty'
            }
            this.all = []
            for(const cond of allArray) {
                this.all.push(new StringCondition(cond))
            }
        }
        
        const anyArray: any = input['any']
        if (anyArray) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            oneConditionSpecified = true
            if (!Array.isArray(anyArray)) {
                throw '"any" must be an array'
            }
            if (anyArray.length === 0) {
                throw '"any" array cannot be empty'
            }
            this.any = []
            for(const cond of anyArray) {
                this.any.push(new StringCondition(cond))
            }
        }

        const notValue: any = input['not']
        if (notValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            this.not = new StringCondition(notValue)
            oneConditionSpecified = true
        }

        const caseInsensitiveValue = input['caseInsensitive']
        if (caseInsensitiveValue) {
            if (typeof caseInsensitiveValue !== 'boolean') {
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

        const eqValue = input['eq']
        if (eqValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof eqValue !== 'string') {
                throw 'eq must be a string'
            }
            this.eq = eqValue
            if (this.caseInsensitive) {
                this.eq = eqValue.toLocaleLowerCase()
            }
            oneConditionSpecified = true
        }
        const neqValue = input['neq']
        if (neqValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof neqValue !== 'string') {
                throw 'neq must be a string'
            }
            this.neq = neqValue
            if (this.caseInsensitive) {
                this.neq = neqValue.toLocaleLowerCase()
            }
            oneConditionSpecified = true
        }
        const startsWithValue = input['startsWith']
        if (startsWithValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof startsWithValue !== 'string') {
                throw 'startsWith must be a string'
            }
            this.startsWith = startsWithValue
            if (this.caseInsensitive) {
                this.startsWith = startsWithValue.toLocaleLowerCase()
            }
            oneConditionSpecified = true
        }
        const endsWithValue = input['endsWith']
        if (endsWithValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof endsWithValue !== 'string') {
                throw 'endsWith must be a string'
            }
            this.endsWith = endsWithValue
            if (this.caseInsensitive) {
                this.endsWith = endsWithValue.toLocaleLowerCase()
            }
            oneConditionSpecified = true
        }
        const regexValue = input['regex']
        if (regexValue) {
            if (oneConditionSpecified) {
                throw oneAndOnlyOneMsg
            }
            if (typeof regexValue !== 'string') {
                throw 'regex must be a string'
            }
            try {
                this.regex = new RegExp(regexValue)
            } catch(e) {
                throw 'Provided string is not a valid regex'
            }
            oneConditionSpecified = true
        }
        if (!oneConditionSpecified) {
            throw oneAndOnlyOneMsg
        }
    }
    check(input: string): boolean {
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
        if (this.neq) {
            return input !== this.neq
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
