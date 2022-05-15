import NumberCondition from "./NumberCondition"

describe ('NumberCondition', () => {
    describe('constructor', () => {
        describe('input', () => {
            test('not object should throw', () => {
                expect(() => {new NumberCondition('not-object')}).toThrow()
            })
            test('empty should throw', () => {
                expect(() => {new NumberCondition({})}).toThrow()
            })
        })
        
        describe('all', () => {
            test('not array should throw', () => {
                expect(() => {new NumberCondition({ all: {} })}).toThrow()
            })
            test('empty array should throw', () => {
                expect(() => {new NumberCondition({ all: [] })}).toThrow()
            })
        })
        describe('any', () => {
            test('not array should throw', () => {
                expect(() => {new NumberCondition({ all: {} })}).toThrow()
            })
            test('empty array should throw', () => {
                expect(() => {new NumberCondition({ all: [] })}).toThrow()
            })
        })
        describe('eq', () => {
            test('eq not number should throw', () => {
                expect(() => {new NumberCondition({ eq: 'a' })}).toThrow()
            })
        })
        describe('ne', () => {
            test('not number should throw', () => {
                expect(() => {new NumberCondition({ ne: 'a' })}).toThrow()
            })
        })
        describe('gt', () => {
            test('not number should throw', () => {
                expect(() => {new NumberCondition({ gt: 'a' })}).toThrow()
            })
        })
        describe('gte', () => {
            test('not number should throw', () => {
                expect(() => {new NumberCondition({ gte: 'a' })}).toThrow()
            })
        })
        describe('lt', () => {
            test('not number should throw', () => {
                expect(() => {new NumberCondition({ lt: 'a' })}).toThrow()
            })
        })
        describe('lte', () => {
            test('not number should throw', () => {
                expect(() => {new NumberCondition({ lte: 'a' })}).toThrow()
            })
        })
        test('has multiple things should throw', () => {
            expect(() => {new NumberCondition({ eq: 0, gt: 0 })}).toThrow()
        })
    })
    
    describe('check function', () => {
        test('input not number should throw', () => {
            const cond = new NumberCondition({ eq: 0 })
            expect(() => {cond.check('a')}).toThrow()
        })
        describe('eq', () => {
            test('equal returns true', () => {
                const cond = new NumberCondition({ eq: 0 })
                expect(cond.check(0)).toBe(true)
            })
            test('not equal returns false', () => {
                const cond = new NumberCondition({ eq: 0 })
                expect(cond.check(1)).toBe(false)
            })
        })
        describe('ne', () => {
            test('equal returns false', () => {
                const cond = new NumberCondition({ ne: 0 })
                expect(cond.check(0)).toBe(false)
            })
            test('not equal returns true', () => {
                const cond = new NumberCondition({ ne: 0 })
                expect(cond.check(1)).toBe(true)
            })
        })
        describe('gt', () => {
            test('greater returns true', () => {
                const cond = new NumberCondition({ gt: 0 })
                expect(cond.check(1)).toBe(true)
            })
            test('equal returns false', () => {
                const cond = new NumberCondition({ gt: 0 })
                expect(cond.check(0)).toBe(false)
            })
            test('less returns false', () => {
                const cond = new NumberCondition({ gt: 0 })
                expect(cond.check(-1)).toBe(false)
            })
        })
        describe('gte', () => {
            test('greater returns true', () => {
                const cond = new NumberCondition({ gte: 0 })
                expect(cond.check(1)).toBe(true)
            })
            test('equal returns true', () => {
                const cond = new NumberCondition({ gte: 0 })
                expect(cond.check(0)).toBe(true)
            })
            test('less returns false', () => {
                const cond = new NumberCondition({ gte: 0 })
                expect(cond.check(-1)).toBe(false)
            })
        })
        describe('lt', () => {
            test('greater returns false', () => {
                const cond = new NumberCondition({ lt: 0 })
                expect(cond.check(1)).toBe(false)
            })
            test('equal returns false', () => {
                const cond = new NumberCondition({ lt: 0 })
                expect(cond.check(0)).toBe(false)
            })
            test('less returns true', () => {
                const cond = new NumberCondition({ lt: 0 })
                expect(cond.check(-1)).toBe(true)
            })
        })
        describe('lte', () => {
            test('greater returns false', () => {
                const cond = new NumberCondition({ lte: 0 })
                expect(cond.check(1)).toBe(false)
            })
            test('equal returns true', () => {
                const cond = new NumberCondition({ lte: 0 })
                expect(cond.check(0)).toBe(true)
            })
            test('less returns true', () => {
                const cond = new NumberCondition({ lte: 0 })
                expect(cond.check(-1)).toBe(true)
            })
        })
    })
})

