import BooleanCondition from "./BooleanCondition"

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
        test('throw if input not boolean', () => {
            const cond = new BooleanCondition({eq: true})
            expect(() => {cond.check('abc')}).toThrow()
        })
        test('return true if equal', () => {
            const cond1 = new BooleanCondition({eq: true})
            expect(cond1.check(true)).toBe(true)
            const cond2 = new BooleanCondition({eq: false})
            expect(cond2.check(false)).toBe(true)
        })
        test('return false if not equal', () => {
            const cond1 = new BooleanCondition({eq: true})
            expect(cond1.check(false)).toBe(false)
            const cond2 = new BooleanCondition({eq: false})
            expect(cond2.check(true)).toBe(false)
        })
    })
})

