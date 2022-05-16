import { BooleanCondition } from "./BooleanCondition"

describe ('BooleanCondition', () => {
    describe('constructor', () => {
        test('throw if input not object', () => {
            expect(() => {new BooleanCondition('not-object')}).toThrow()
        })
        test('throw if input does not have eq', () => {
            expect(() => {new BooleanCondition({})}).toThrow()
        })
        test('throw if eq is not boolean', () => {
            expect(() => {new BooleanCondition({ eq: 'abc' })}).toThrow()
        })
        test('success if input valid', () => {
            const cond = new BooleanCondition({eq: true})
            expect(cond.eq).toBe(true)
        })
    })
    
    describe('check function', () => {
        test('not boolean return false', () => {
            const cond = new BooleanCondition({eq: true})
            expect(cond.check('abc')).toBe(false)
        })
        test('equal return true', () => {
            const cond1 = new BooleanCondition({eq: true})
            expect(cond1.check(true)).toBe(true)
            const cond2 = new BooleanCondition({eq: false})
            expect(cond2.check(false)).toBe(true)
        })
        test('not equal return false', () => {
            const cond1 = new BooleanCondition({eq: true})
            expect(cond1.check(false)).toBe(false)
            const cond2 = new BooleanCondition({eq: false})
            expect(cond2.check(true)).toBe(false)
        })
    })
})

