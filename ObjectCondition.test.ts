import ObjectCondition from "./ObjectCondition"

describe ('ObjectCondition', () => {
    describe('constructor', () => {
        describe('input', () => {
            test('not object should throw', () => {
                expect(() => {new ObjectCondition('not-object')}).toThrow()
            })
            test('empty should throw', () => {
                expect(() => {new ObjectCondition({})}).toThrow()
            })
        })
        
        describe('all', () => {
            test('not array should throw', () => {
                expect(() => {new ObjectCondition({ all: {} })}).toThrow()
            })
            test('empty array should throw', () => {
                expect(() => {new ObjectCondition({ all: [] })}).toThrow()
            })
        })
        describe('any', () => {
            test('not array should throw', () => {
                expect(() => {new ObjectCondition({ all: {} })}).toThrow()
            })
            test('empty array should throw', () => {
                expect(() => {new ObjectCondition({ all: [] })}).toThrow()
            })
        })
        test('has multiple conditions should throw', () => {
            expect(() => {new ObjectCondition({ fieldValue: "", fieldNames: "" })}).toThrow()
        })
    })
    describe('check function', () => {
        test('input not object should throw', () => {
            const cond = new ObjectCondition({
                field: {
                    fieldName: "a",
                    fieldValue: {
                        allowedType: 'null'
                    }
                }
            })
            expect(() => {cond.check(0)}).toThrow()
        })
    })
})

