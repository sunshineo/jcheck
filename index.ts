function objectNotArrayNotNull(obj: any) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

class StringCondition {
    eq: string
    constructor(input: any) {
        if (!objectNotArrayNotNull) {
            throw 'input must be an object not array and not null'
        }
        const eqValue = input['eq']
        if (!eqValue) {
            throw 'Currently we only support eq'
        }
        if (typeof eqValue !== 'string') {
            throw 'eq must be a string'
        }
        this.eq = eqValue
    }
    check(input: string): boolean {
        return input === this.eq
    }
}

class NumberCondition {
    eq: number
    constructor(input: any) {
        if (!objectNotArrayNotNull) {
            throw 'input must be an object not array and not null'
        }
        const eqValue = input['eq']
        if (!eqValue) {
            throw 'Currently we only support eq'
        }
        if (typeof eqValue !== 'number') {
            throw 'eq must be a number'
        }
        this.eq = eqValue
    }
    check(input: number): boolean {
        return input === this.eq
    }
}

class AllowedTypesCondition {
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

class FieldCondition {
    fieldName: string
    allowedTypes?: AllowedTypesCondition
    stringCondition?: StringCondition
    numberCondition?: NumberCondition
    objectCondition?: ObjectCondition
    // arrayCondition?: ArrayCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull) {
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

        let oneConditionSpecified: boolean = false
        const allowedTypesValue: any = input['allowedTypes']
        if (allowedTypesValue) {
            this.allowedTypes = new AllowedTypesCondition(allowedTypesValue)
            oneConditionSpecified = true
        }

        const stringCoditionValue: any = input['stringCondition']
        if (stringCoditionValue) {
            this.stringCondition = new StringCondition(stringCoditionValue)
            oneConditionSpecified = true
        }

        const numberCoditionValue: any = input['numberCondition']
        if (numberCoditionValue) {
            this.numberCondition = new NumberCondition(numberCoditionValue)
            oneConditionSpecified = true
        }

        if (!oneConditionSpecified) {
            throw 'Must specify one of: allowedTypes, stringCondition, numberCondition'
        }
    }

    check(input: any): boolean {
        if (!objectNotArrayNotNull) {
            throw 'input must be an object not array and not null'
        }
        const fieldValue: any = input[this.fieldName]
        // This contains both null and key does not exists right now
        // Will separate later using keys array
        if (!fieldValue) {
            // null not allowed
            if (this.allowedTypes && !this.allowedTypes?.allowNull) {
                return false
            }
            // null allowed
            return true
        }
        const fieldType: string = typeof fieldValue
        if (fieldType === 'boolean') {
            // boolean not allowed
            if (this.allowedTypes && !this.allowedTypes?.allowBoolean) {
                return false
            }
            // boolean allowed
            return fieldValue
        }
        if (fieldType === 'string') {
            // string not allowed
            if (this.allowedTypes && !this.allowedTypes?.allowString) {
                return false
            }
            // string allowed
            // no required condition on the string
            if (!this.stringCondition) {
                return true
            }
            // has required condition on the string
            return this.stringCondition.check(fieldValue)
        }
        if (fieldType === 'number') {
            // number not allowed
            if (this.allowedTypes && !this.allowedTypes?.allowNumber) {
                return false
            }
            // number allowed
            // no required condition on the number
            if (!this.numberCondition) {
                return true
            }
            // has required condition on the number
            return this.numberCondition.check(fieldValue)
        }
        if (fieldType === 'object') {
            // not array
            if (!Array.isArray(fieldValue)) {
                // no required condition on the object
                if (!this.objectCondition) {
                    return true
                }
                // has required condition on the object
                return this.objectCondition.check(fieldValue)
            }
            // array
            throw `We do not support array yet`
        }
        throw `We do not support field type ${fieldType}`
    }
}

class ObjectCondition {
    all?: ObjectCondition[]
    any?: ObjectCondition[]
    not?: ObjectCondition

    // keysCondition?: ArrayCondition
    // valuesCondition?: ArrayCondition
    fieldCondition?: FieldCondition

    constructor(input: any) {
        if (!objectNotArrayNotNull) {
            throw 'input must be an object not array and not null'
        }
        let oneConditionSpecified: boolean = false
        const allArray: any = input['all']
        if (allArray) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or valueCondition'
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
                this.all.push(new ObjectCondition(cond))
            }
        }
        
        const anyArray: any = input['any']
        if (anyArray) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or valueCondition'
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
                this.any.push(new ObjectCondition(cond))
            }
        }

        const notValue: any = input['not']
        if (notValue) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or valueCondition'
            }
            oneConditionSpecified = true
            this.not = new ObjectCondition(notValue)
        }

        const fieldConditionValue: any = input['fieldCondition']
        if (fieldConditionValue) {
            if (oneConditionSpecified) {
                throw 'Can only have one of: all, any, not, or valueCondition'
            }
            oneConditionSpecified = true
            this.fieldCondition = new FieldCondition(fieldConditionValue)
        }
        if (!oneConditionSpecified) {
            throw 'Must specify one and only one of: all, any, not, or fieldCondition'
        }
    }

    check(input: any): boolean {
        if (!objectNotArrayNotNull) {
            throw 'input must be an object not array and not null'
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
        if (this.fieldCondition) {
            return this.fieldCondition.check(input)
        }
        throw 'ObjectConditon does not contain anything. Constructor should have thrown but did not.'
    }
}

const main = async () => {
    const input1: any = {
        fieldCondition: {
            fieldName: 'strfield',
            allowedTypes: {
                allowNull: true,
                allowBoolean: false,
                allowString: true,
            }
        }
    }
    console.log(input1)
    const cond1 = new ObjectCondition(input1)
    const obj11 = {
        strfield: null,
    }
    console.log(obj11)
    console.log(cond1.check(obj11))
    const obj12 = {
        strfield: true,
    }
    console.log(obj12)
    console.log(cond1.check(obj12))
    const obj13 = {
        strfield: 'xyz',
    }
    console.log(obj13)
    console.log(cond1.check(obj13))

    const input2: any = {
        fieldCondition: {
            fieldName: 'strfield',
            allowedTypes: {
                allowNull: false,
                allowBoolean: false,
                allowString: true,
            },
            stringCondition: {
                eq: 'abc'
            }
        }
    }
    console.log(input2)
    const cond2 = new ObjectCondition(input2)
    const obj21 = {
        strfield: null,
    }
    console.log(obj21)
    console.log(cond2.check(obj21))
    const obj22 = {
        strfield: true,
    }
    console.log(obj22)
    console.log(cond2.check(obj12))
    const obj23 = {
        strfield: 'xyz',
    }
    console.log(obj23)
    console.log(cond2.check(obj23))
    const obj24 = {
        strfield: 'abc',
    }
    console.log(obj24)
    console.log(cond2.check(obj24))
}

main()
