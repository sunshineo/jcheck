import { ObjectCondition } from "./ObjectCondition"

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
            expect(() => {new ObjectCondition({ fieldValues: "", fieldNames: "" })}).toThrow()
        })
    })
    describe('check function', () => {
        test('input not object return false', () => {
            const cond = new ObjectCondition({
                field: {
                    fieldName: "a",
                    fieldValue: {
                        isType: 'null'
                    }
                }
            })
            expect(cond.check(0)).toBe(false)
        })
    })
})

