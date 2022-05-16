import { FieldCondition } from "./FieldCondition"

describe ('FieldCondition', () => {
    describe('constructor', () => {
        describe('input', () => {
            test('not object should throw', () => {
                expect(() => {new FieldCondition('not-object')}).toThrow()
            })
            test('empty should throw', () => {
                expect(() => {new FieldCondition({})}).toThrow()
            })
        })

        test('only have fieldName throw', () => {
            expect(() => {new FieldCondition({
                fieldName: 'a'
            })}).toThrow()
        })
        
        describe('all', () => {
            test('not array should throw', () => {
                expect(() => {new FieldCondition({ fieldName: 'a', all: {} })}).toThrow()
            })
            test('empty array should throw', () => {
                expect(() => {new FieldCondition({ fieldName: 'a', all: [] })}).toThrow()
            })
        })
        describe('any', () => {
            test('not array should throw', () => {
                expect(() => {new FieldCondition({ fieldName: 'a', all: {} })}).toThrow()
            })
            test('empty array should throw', () => {
                expect(() => {new FieldCondition({ fieldName: 'a', all: [] })}).toThrow()
            })
        })
        test('has multiple conditions should throw', () => {
            expect(() => {new FieldCondition({ fieldName: 'a', fieldValue: 'a', all: [] })}).toThrow()
        })
    })
    describe('check function', () => {
        test('input not object return false', () => {
            const cond = new FieldCondition({
                fieldName: "a",
                fieldValue: {
                    allowedType: 'null'
                }
            })
            expect(cond.check(0)).toBe(false)
        })
    })
})

