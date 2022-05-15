import BooleanCondition from "./BooleanCondition"

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
