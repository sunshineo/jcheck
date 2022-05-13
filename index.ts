
enum JSONTypes {
    Null,
    Boolean,
    String,
    Number,
    Array,
    Object,
}

class StringCondition {
    regex: string
}

class NumberCondition {
    eq?: number
    gt?: number
    lt?: number
}

class AggregateCondition {
    valueCondition: ValueCondition
    matchingElementCount: NumberCondition
}

class ValueAtIndexCondition {
    index: number
    valueCondition: ValueCondition
}

class ArrayCondition {
    sizeCondition?: NumberCondition
    aggregateCondition?: AggregateCondition
    valueAtIndexCondition?: ValueAtIndexCondition
}

class FieldCondition {
    fieldName: string
    fieldValueCondition: ValueCondition
}

class ObjectCondition {
    keysCondition?: ArrayCondition
    valuesCondition?: ArrayCondition
    fieldCondition?: FieldCondition
}

class ValueCondition {
    allowedTypes?: JSONTypes[]
    stringCondition?: StringCondition
    numberCondition?: NumberCondition
    arrayCondition?: ArrayCondition
    objectCondition?: ObjectCondition
}

class Condition {
    all?: Condition[]
    any?: Condition[]
    not?: Condition
    valueCondition?: ValueCondition

    constructor(input: object) {
        console.log(typeof input)
    }
}

const main = async () => {
    new Condition({})
}

main()
