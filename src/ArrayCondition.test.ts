import ArrayCondition from "./ArrayCondition"

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
            expect(() => {new ArrayCondition({ fieldValue: "", fieldNames: "" })}).toThrow()
        })
    })
    describe('check', () => {
        test('throw if input not array', () => {
            const cond = new ArrayCondition({
                size: {
                    eq: 0
                }
            })
            expect(() => {cond.check('not-array')}).toThrow()
        })
    })
})

