import { DateCondition } from "./DateCondition"

describe ('DateCondition', () => {
    describe('constructor', () => {
        describe('input', () => {
            test('not object should throw', () => {
                expect(() => {new DateCondition('not-object')}).toThrow()
            })
            test('empty should throw', () => {
                expect(() => {new DateCondition({})}).toThrow()
            })

            describe('all', () => {
                test('not array should throw', () => {
                    expect(() => {new DateCondition({ all: {} })}).toThrow()
                })
                test('empty array should throw', () => {
                    expect(() => {new DateCondition({ all: [] })}).toThrow()
                })
            })
            describe('any', () => {
                test('not array should throw', () => {
                    expect(() => {new DateCondition({ all: {} })}).toThrow()
                })
                test('empty array should throw', () => {
                    expect(() => {new DateCondition({ all: [] })}).toThrow()
                })
            })
            describe('before', () => {
                test('not string should throw', () => {
                    expect(() => {new DateCondition({ before: 0 })}).toThrow()
                })
                test('not string represent date should throw', () => {
                    expect(() => {new DateCondition({ before: 'abc' })}).toThrow()
                })
            })
            describe('after', () => {
                test('not string should throw', () => {
                    expect(() => {new DateCondition({ after: 0 })}).toThrow()
                })
                test('not string represent date should throw', () => {
                    expect(() => {new DateCondition({ after: 'abc' })}).toThrow()
                })
            })
            test('has multiple things should throw', () => {
                expect(() => {
                    new DateCondition({
                        before: '2022-05-15T07:45:07.172Z',
                        after: '2022-05-15T07:45:07.172Z' 
                    })
                }).toThrow()
            })
        })

    })
    
    describe('check function', () => {
        describe('input', () => {
            test('not string return false', () => {
                const cond = new DateCondition({ before: '2022-05-15T07:45:07.172Z' })
                expect(cond.check(0)).toBe(false)
            })
            test('not string representing date return false', () => {
                const cond = new DateCondition({ before: '2022-05-15T07:45:07.172Z' })
                expect(cond.check('a')).toBe(false)
            })
        })
        
        describe('before', () => {
            test('input earlier returns true', () => {
                const cond = new DateCondition({ before: '2022-05-15T07:45:07.172Z' })
                expect(cond.check('2022-05-14T07:45:07.172Z')).toBe(true)
            })
            test('input not earlier returns false', () => {
                const cond = new DateCondition({ before: '2022-05-15T07:45:07.172Z' })
                expect(cond.check('2022-05-16T07:45:07.172Z')).toBe(false)
            })
        })

        describe('after', () => {
            test('input later returns true', () => {
                const cond = new DateCondition({ after: '2022-05-15T07:45:07.172Z' })
                expect(cond.check('2022-05-16T07:45:07.172Z')).toBe(true)
            })
            test('input not later returns false', () => {
                const cond = new DateCondition({ after: '2022-05-15T07:45:07.172Z' })
                expect(cond.check('2022-05-15T07:45:07.172Z')).toBe(false)
            })
        })
        
    })
})

