import { StringCondition } from "./StringCondition"

describe ('StringCondition', () => {
    describe('constructor', () => {
        describe('input', () => {
            test('not object should throw', () => {
                expect(() => {new StringCondition('not-object')}).toThrow()
            })
            test('empty should throw', () => {
                expect(() => {new StringCondition({})}).toThrow()
            })
        })
        
        describe('all', () => {
            test('not array should throw', () => {
                expect(() => {new StringCondition({ all: {} })}).toThrow()
            })
            test('empty array should throw', () => {
                expect(() => {new StringCondition({ all: [] })}).toThrow()
            })
        })
        describe('any', () => {
            test('not array should throw', () => {
                expect(() => {new StringCondition({ all: {} })}).toThrow()
            })
            test('empty array should throw', () => {
                expect(() => {new StringCondition({ all: [] })}).toThrow()
            })
        })
        describe('eq', () => {
            test('eq not string should throw', () => {
                expect(() => {new StringCondition({ eq: 0 })}).toThrow()
            })
        })
        describe('ne', () => {
            test('not string should throw', () => {
                expect(() => {new StringCondition({ ne: 0 })}).toThrow()
            })
        })
        describe('gt', () => {
            test('not string should throw', () => {
                expect(() => {new StringCondition({ gt: 0 })}).toThrow()
            })
        })
        describe('gte', () => {
            test('not string should throw', () => {
                expect(() => {new StringCondition({ gte: 0 })}).toThrow()
            })
        })
        describe('lt', () => {
            test('not string should throw', () => {
                expect(() => {new StringCondition({ lt: 0 })}).toThrow()
            })
        })
        describe('lte', () => {
            test('not string should throw', () => {
                expect(() => {new StringCondition({ lte: 0 })}).toThrow()
            })
        })
        test('has multiple conditions should throw', () => {
            expect(() => {new StringCondition({ eq: 'a', ne: 'a' })}).toThrow()
        })
    })
    
    describe('check function', () => {
        test('input not string return false', () => {
            const cond = new StringCondition({ eq: 'a' })
            expect(cond.check(0)).toBe(false)
        })
        describe('eq', () => {
            test('equal returns true', () => {
                const cond = new StringCondition({ eq: 'a' })
                expect(cond.check('a')).toBe(true)
            })
            test('not equal returns false', () => {
                const cond = new StringCondition({ eq: 'a' })
                expect(cond.check('b')).toBe(false)
            })
        })
        describe('ne', () => {
            test('equal returns false', () => {
                const cond = new StringCondition({ ne: 'a' })
                expect(cond.check('a')).toBe(false)
            })
            test('not equal returns true', () => {
                const cond = new StringCondition({ ne: 'a' })
                expect(cond.check('b')).toBe(true)
            })
        })
        describe('startsWith', () => {
            test('should returns true', () => {
                const cond = new StringCondition({ startsWith: 'abc' })
                expect(cond.check('abcdefg')).toBe(true)
            })
            test('should returns false', () => {
                const cond = new StringCondition({ startsWith: 'abc' })
                expect(cond.check('gfedcba')).toBe(false)
            })
        })
        describe('endsWith', () => {
            test('should returns true', () => {
                const cond = new StringCondition({ endsWith: 'xyz' })
                expect(cond.check('abcxyz')).toBe(true)
            })
            test('should returns false', () => {
                const cond = new StringCondition({ endsWith: 'xyz' })
                expect(cond.check('xyzabc')).toBe(false)
            })
        })
    })
})

