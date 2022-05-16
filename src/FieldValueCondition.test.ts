import { FieldValueCondition } from "./FieldValueCondition"

describe ('FieldValueCondition', () => {
    describe('constructor', () => {
        describe('input', () => {
            test('not object should throw', () => {
                expect(() => {new FieldValueCondition('not-object')}).toThrow()
            })
            test('empty should throw', () => {
                expect(() => {new FieldValueCondition({})}).toThrow()
            })
        })

        describe('allowedType', () => {
            test('not string throw', () => {
                expect(() => {new FieldValueCondition({ allowedType: 0 })}).toThrow()
            })
            test('not valid string throw', () => {
                expect(() => {new FieldValueCondition({ allowedType: 'not-valid' })}).toThrow()
            })
        })

        describe('booleanCondition', () => {
            test('if boolean is not allowedType throw', () => {
                expect(() => {
                    new FieldValueCondition({
                        allowedType: 'null',
                        booleanCondition: ''
                    })
                })
            })
        })
        describe('numberCondition', () => {
            test('if number is not allowedType throw', () => {
                expect(() => {
                    new FieldValueCondition({
                        allowedType: 'null',
                        numberCondition: ''
                    })
                })
            })
        })
        describe('stringCondition', () => {
            test('if string is not allowedType throw', () => {
                expect(() => {
                    new FieldValueCondition({
                        allowedType: 'null',
                        stringCondition: ''
                    })
                })
            })
        })
        describe('objectCondition', () => {
            test('if object is not allowedType throw', () => {
                expect(() => {
                    new FieldValueCondition({
                        allowedType: 'null',
                        objectCondition: ''
                    })
                })
            })
        })
        describe('arrayCondition', () => {
            test('if array is not allowedType throw', () => {
                expect(() => {
                    new FieldValueCondition({
                        allowedType: 'null',
                        arrayCondition: ''
                    })
                })
            })
        })
        describe('dateCondition', () => {
            test('if date is not allowedType throw', () => {
                expect(() => {
                    new FieldValueCondition({
                        allowedType: 'null',
                        dateCondition: ''
                    })
                })
            })
        })
    })
    describe('check function', () => {
        describe('undefined condition', () => {
            test('return true for undefined', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'undefined'
                })
                expect(cond.check(undefined)).toBe(true)
            })
            test('return false for null', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'undefined'
                })
                expect(cond.check(null)).toBe(false)
            })
            test('return false for not undefined', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'undefined'
                })
                expect(cond.check('not-undefined')).toBe(false)
            })
        })
        describe('null condition', () => {
            test('return true for null', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'null'
                })
                expect(cond.check(null)).toBe(true)
            })
            test('return false for undefined', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'null'
                })
                expect(cond.check(undefined)).toBe(false)
            })
            test('return false for not null', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'null'
                })
                expect(cond.check('not-null')).toBe(false)
            })
        })
        describe('boolean condition', () => {
            test('return true for boolean', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'boolean'
                })
                expect(cond.check(true)).toBe(true)
            })
            test('return false for not boolean', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'boolean'
                })
                expect(cond.check('not-boolean')).toBe(false)
            })
        })
        describe('number condition', () => {
            test('return true for number', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'number'
                })
                expect(cond.check(0)).toBe(true)
            })
            test('return false for not number', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'number'
                })
                expect(cond.check('not-number')).toBe(false)
            })
        })
        describe('string condition', () => {
            test('return true for string', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'string'
                })
                expect(cond.check('str')).toBe(true)
            })
            test('return false for not string', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'string'
                })
                expect(cond.check(0)).toBe(false)
            })
        })
        describe('array condition', () => {
            test('return true for array', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'array'
                })
                expect(cond.check([])).toBe(true)
            })
            test('return false for not array', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'array'
                })
                expect(cond.check('not-array')).toBe(false)
            })
        })
        describe('object condition', () => {
            test('return true for object', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'object'
                })
                expect(cond.check({})).toBe(true)
            })
            test('return false for not object', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'object'
                })
                expect(cond.check('not-object')).toBe(false)
            })
        })
        describe('date condition', () => {
            test('return true for date', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'date'
                })
                expect(cond.check('2022-05-15T07:45:07.172Z')).toBe(true)
            })
            test('return false for not date', () => {
                const cond = new FieldValueCondition({
                    allowedType: 'date'
                })
                expect(cond.check('not-date')).toBe(false)
            })
        })
    })
})

