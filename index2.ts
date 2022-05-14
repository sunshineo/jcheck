
// class StringCondition {
//     regex: string
//     constructor(input: any) {
//         if (!objectNotArrayNotNull) {
//             throw 'input must be an object not array and not null'
//         }
//         const regexValue = input['regex']
//         if (!regexValue) {
//             throw 'Currently we only support an regex'
//         }
//         if (typeof regexValue !== 'string') {
//             throw 'regex must be a string'
//         }
//         this.regex = regexValue
//     }
// }

// class NumberCondition {
//     eq?: number
//     gt?: number
//     lt?: number
//     constructor(input: any) {
//         if (!objectNotArrayNotNull) {
//             throw 'input must be an object not array and not null'
//         }
//         let oneConditionSpecified: boolean = false
//         const eqValue: any = input['eq']
//         if (eqValue) {
//             if (typeof eqValue !== 'number') {
//                 throw 'eq must be a number'
//             }
//             oneConditionSpecified = true
//             this.eq = eqValue
//         }
//         const gtValue: any = input['gt']
//         if (gtValue) {
//             if (typeof gtValue !== 'number') {
//                 throw 'gt must be a number'
//             }
//             oneConditionSpecified = true
//             this.gt = gtValue
//         }
//         const ltValue: any = input['lt']
//         if (ltValue) {
//             if (typeof ltValue !== 'number') {
//                 throw 'lt must be a number'
//             }
//             oneConditionSpecified = true
//             this.lt = ltValue
//         }
//     }
// }

// class AggregateCondition {
//     valueCondition: ValueCondition
//     matchingElementCount: NumberCondition
// }

// class ValueAtIndexCondition {
//     index: number
//     valueCondition: ValueCondition
// }

// class ArrayCondition {
//     sizeCondition?: NumberCondition
//     aggregateCondition?: AggregateCondition
//     valueAtIndexCondition?: ValueAtIndexCondition
//     constructor(input: any) {
//         if (!objectNotArrayNotNull) {
//             throw 'input must be an object not array and not null'
//         }
//         let oneConditionSpecified: boolean = false
//         const sizeConditionValue: any = input['sizeCondition']
//         if (sizeConditionValue) {
//             this.sizeCondition = new NumberCondition(sizeConditionValue)
//             oneConditionSpecified = true
//         }
//         const aggregateConditionValue: any = input['aggregateCondition']
//         if (aggregateConditionValue) {
//             this.aggregateCondition = new AggregateCondition(aggregateConditionValue)
//             oneConditionSpecified = true
//         }
//         const valueAtIndexConditionValue: any = input['valueAtIndexCondition']
//         if (valueAtIndexConditionValue) {
//             this.valueAtIndexCondition = new ValueAtIndexCondition(valueAtIndexConditionValue)
//             oneConditionSpecified = true
//         }
//     }
// }

// class FieldCondition {
//     fieldName: string
//     fieldValueCondition: ValueCondition
// }

// class ObjectCondition {
//     all?: ObjectCondition[]
//     any?: ObjectCondition[]
//     not?: ObjectCondition

//     keysCondition?: ArrayCondition
//     valuesCondition?: ArrayCondition
//     fieldCondition?: FieldCondition
//     constructor(input: any) {
//         if (!objectNotArrayNotNull) {
//             throw 'input must be an object not array and not null'
//         }

//     }
// }

// class AllowedTypesCondition {
//     allowNull: boolean = false
//     allowBoolean: boolean = false
//     allowString: boolean = false
//     allowNumber: boolean = false
//     allowObject: boolean = false
//     allowArray: boolean = false

//     constructor(input: any) {
//         if (!objectNotArrayNotNull) {
//             throw 'input must be an object not array and not null'
//         }
//         const allowNullValue: any = input['allowNull']
//         if (allowNullValue) {
//             if (typeof allowNullValue !== 'boolean') {
//                 throw 'allowNull must be a boolean value'
//             }
//             this.allowNull = allowNullValue
//         }
//         const allowBooleanValue: any = input['allowBoolean']
//         if (allowBooleanValue) {
//             if (typeof allowBooleanValue !== 'boolean') {
//                 throw 'allowBoolean must be a boolean value'
//             }
//             this.allowBoolean = allowBooleanValue
//         }
//         const allowStringValue: any = input['allowString']
//         if (allowStringValue) {
//             if (typeof allowStringValue !== 'boolean') {
//                 throw 'allowString must be a boolean value'
//             }
//             this.allowString = allowStringValue
//         }
//         const allowNumberValue: any = input['allowNumber']
//         if (allowNumberValue) {
//             if (typeof allowNumberValue !== 'boolean') {
//                 throw 'allowNumber must be a boolean value'
//             }
//             this.allowNumber = allowNumberValue
//         }
//         const allowObjectValue: any = input['allowObject']
//         if (allowObjectValue) {
//             if (typeof allowObjectValue !== 'boolean') {
//                 throw 'allowObject must be a boolean value'
//             }
//             this.allowObject = allowObjectValue
//         }
//         const allowArrayValue: any = input['allowArray']
//         if (allowArrayValue) {
//             if (typeof allowArrayValue !== 'boolean') {
//                 throw 'allowArray must be a boolean value'
//             }
//             this.allowArray = allowArrayValue
//         }
//     }
// }

// class ValueCondition {
//     allowedTypes?: AllowedTypesCondition
//     stringCondition?: StringCondition
//     numberCondition?: NumberCondition
//     objectCondition?: ObjectCondition
//     arrayCondition?: ArrayCondition

//     constructor(input: any) {
//         if (!objectNotArrayNotNull) {
//             throw 'input must be an object not array and not null'
//         }
//         let oneConditionSpecified: boolean = false
//         const allowedTypesValue: any = input['allowedTypes']
//         if (allowedTypesValue) {
//             oneConditionSpecified = true
//             this.allowedTypes = new AllowedTypesCondition(allowedTypesValue)
//         }
//         const stringCoditionValue: any = input['stringCondition']
//         if (stringCoditionValue) {
//             oneConditionSpecified = true
//             this.stringCondition = new StringCondition(stringCoditionValue)
//         }
//         const numberCoditionValue: any = input['numberCondition']
//         if (numberCoditionValue) {
//             oneConditionSpecified = true
//             this.numberCondition = new NumberCondition(numberCoditionValue)
//         }
//         const objectCoditionValue: any = input['objectCondition']
//         if (objectCoditionValue) {
//             oneConditionSpecified = true
//             this.objectCondition = new ObjectCondition(objectCoditionValue)
//         }
//         const arrayCoditionValue: any = input['arrayCondition']
//         if (arrayCoditionValue) {
//             oneConditionSpecified = true
//             this.arrayCondition = new ArrayCondition(arrayCoditionValue)
//         }
//     }
// }

// const objectNotArrayNotNull = obj => {
//     return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
// }

// class Condition {
//     all?: Condition[]
//     any?: Condition[]
//     not?: Condition
//     valueCondition?: ValueCondition

//     constructor(input: any) {
//         if (!objectNotArrayNotNull) {
//             throw 'input must be an object not array and not null'
//         }

//         let oneConditionSpecified: boolean = false
//         const allArray: any = input['all']
//         if (allArray) {
//             if (oneConditionSpecified) {
//                 throw 'Can only have one of: all, any, not, or valueCondition'
//             }
//             oneConditionSpecified = true
//             if (!Array.isArray(allArray)) {
//                 throw '"all" must be an array'
//             }
//             if (allArray.length === 0) {
//                 throw '"all" array cannot be empty'
//             }
//             this.all = []
//             for(const cond of allArray) {
//                 this.all.push(new Condition(cond))
//             }
//         }
        
//         const anyArray: any = input['any']
//         if (anyArray) {
//             if (oneConditionSpecified) {
//                 throw 'Can only have one of: all, any, not, or valueCondition'
//             }
//             oneConditionSpecified = true
//             if (!Array.isArray(anyArray)) {
//                 throw '"any" must be an array'
//             }
//             if (anyArray.length === 0) {
//                 throw '"any" array cannot be empty'
//             }
//             this.any = []
//             for(const cond of anyArray) {
//                 this.any.push(new Condition(cond))
//             }
//         }

//         const notValue: any = input['not']
//         if (notValue) {
//             if (oneConditionSpecified) {
//                 throw 'Can only have one of: all, any, not, or valueCondition'
//             }
//             oneConditionSpecified = true
//             this.not = new Condition(notValue)
//         }

//         const valueConditionValue: any = input['valueCondition']
//         if (valueConditionValue) {
//             if (oneConditionSpecified) {
//                 throw 'Can only have one of: all, any, not, or valueCondition'
//             }
//             oneConditionSpecified = true
//             this.valueCondition = new ValueCondition(valueConditionValue)
//         }

//         throw 'Must specify at least one of: all, any, not, or valueCondition'
//     }
// }

// const main = async () => {
//     new Condition({})
// }

// main()
