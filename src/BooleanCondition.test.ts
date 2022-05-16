import { BooleanCondition } from "./BooleanCondition"

describe('BooleanCondition', () => {
    describe('constructor', () => {
        test('input not object throw', () => {
            expect(() => {new BooleanCondition('not-object')}).toThrow()
        })
        test('input empty throw', () => {
            expect(() => {new BooleanCondition({})}).toThrow()
        })
        test('input eq not boolean throw', () => {
            expect(() => {new BooleanCondition({ eq: 'abc' })}).toThrow()
        })
        test('input ne not boolean throw', () => {
            expect(() => {new BooleanCondition({ ne: 'abc' })}).toThrow()
        })
        test('input has both eq and ne throw', () => {
            expect(() => {new BooleanCondition({ eq: true, ne: false })}).toThrow()
        })
    })
    
    describe('check function', () => {
        test('input not boolean return false', () => {
            const cond = new BooleanCondition({eq: true})
            expect(cond.check('abc')).toBe(false)
        })
        describe('eq', () => {
            describe('true', () => {
                const cond = new BooleanCondition({eq: true})
                test('input true return true', () => {
                    expect(cond.check(true)).toBe(true)
                })
                test('input false return false', () => {
                    expect(cond.check(false)).toBe(false)
                })
            })
            describe('false', () => {
                test('input true return false', () => {
                    const cond = new BooleanCondition({eq: false})
                    expect(cond.check(true)).toBe(false)
                })
                test('input false return true', () => {
                    const cond = new BooleanCondition({eq: false})
                    expect(cond.check(false)).toBe(true)
                })
            })
        })
        
        describe('ne', () => {
            describe('true', () => {
                const cond = new BooleanCondition({ne: true})
                test('input true return false', () => {
                    expect(cond.check(true)).toBe(false)
                })
                test('input false return true', () => {
                    expect(cond.check(false)).toBe(true)
                })
            })
            describe('false', () => {
                const cond = new BooleanCondition({ne: false})
                test('input true return true', () => {
                    expect(cond.check(true)).toBe(true)
                })
                test('input false return false', () => {
                    expect(cond.check(false)).toBe(false)
                })
            })
        })
    })
})

