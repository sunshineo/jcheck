import { ArrayCondition } from "./ArrayCondition"

describe ('ArrayCondition', () => {
    describe('constructor', () => {
        describe('input', () => {
            test('not object should throw', () => {
                expect(() => {new ArrayCondition('not-object')}).toThrow()
            })
            test('empty should throw', () => {
                expect(() => {new ArrayCondition({})}).toThrow()
            })
        })
        
        describe('all', () => {
            test('not array should throw', () => {
                expect(() => {new ArrayCondition({ all: {} })}).toThrow()
            })
            test('empty array should throw', () => {
                expect(() => {new ArrayCondition({ all: [] })}).toThrow()
            })
        })
        describe('any', () => {
            test('not array should throw', () => {
                expect(() => {new ArrayCondition({ all: {} })}).toThrow()
            })
            test('empty array should throw', () => {
                expect(() => {new ArrayCondition({ all: [] })}).toThrow()
            })
        })
        test('has multiple conditions should throw', () => {
            expect(() => {
                new ArrayCondition({
                    all: [{
                        size: { eq: 0 }
                    }],
                    any: [{
                        size: { eq: 0 }
                    }]
                })
            }).toThrow()
        })
    })
    describe('check', () => {
        test('not array false', () => {
            const cond = new ArrayCondition({
                size: {
                    eq: 0
                }
            })
            expect(cond.check('not-array')).toBe(false)
        })
        describe('all', ()=> {
            const cond = new ArrayCondition({
                all: [
                    {
                        size: { gt: 0 }
                    },
                    {
                        size: { lt: 2 }
                    },
                ]
            })
            test('return true', () => {
                expect(cond.check(['one'])).toBe(true)
            })
            test('return false', () => {
                expect(cond.check(['one', 'two'])).toBe(false)
            })
        })
        describe('any', ()=> {
            const cond = new ArrayCondition({
                any: [
                    {
                        size: { gt: 2 }
                    },
                    {
                        size: { lt: 1 }
                    },
                ]
            })
            test('return true', () => {
                expect(cond.check([])).toBe(true)
            })
            test('return false', () => {
                expect(cond.check(['one'])).toBe(false)
            })
        })
        describe('not', () => {
            const cond = new ArrayCondition({
                not: {
                    size: { eq: 0 }
                }
            })
            test('return true', () => {
                expect(cond.check(['one'])).toBe(true)
            })
            test('return false', () => {
                expect(cond.check([])).toBe(false)
            })
        })
        describe('size', () => {
            const cond = new ArrayCondition({
                size: { eq: 0 }
            })
            test('true', () => {
                expect(cond.check([])).toBe(true)
            })
            test('false', () => {
                expect(cond.check(['one'])).toBe(false)
            })
        })
        describe('hasElement', () => {
            const cond = new ArrayCondition({
                hasElement: {
                    isType: 'string',
                    stringCondition: {
                        eq: 'abc'
                    }
                }
            })
            test('true', () => {
                expect(cond.check(['a', 'ab', 'abc'])).toBe(true)
            })
            test('false', () => {
                expect(cond.check(['a', 'ab'])).toBe(false)
            })
        })
        describe('hasNoElement', () => {
            const cond = new ArrayCondition({
                hasNoElement: {
                    isType: 'string',
                    stringCondition: {
                        eq: 'abc'
                    }
                }
            })
            test('true', () => {
                expect(cond.check(['a', 'ab'])).toBe(true)
            })
            test('false', () => {
                expect(cond.check(['a', 'ab', 'abc'])).toBe(false)
            })
        })
    })
})

