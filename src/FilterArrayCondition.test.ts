import { FilterArrayCondition } from "./FilterArrayCondition"

describe ('FilterArrayCondition', () => {
    describe('constructor', () => {
        describe('input', () => {
            test('not object throw', () => {
                expect(() => {new FilterArrayCondition('not-object')}).toThrow()
            })
            describe('passFilterCount', () => {
                test('does not exists throw', () => {
                    expect(() => {
                        new FilterArrayCondition({
                            elementFilter: { isType: 'null' }
                        })
                    }).toThrow()
                })
                test('not object throw', () => {
                    expect(() => {
                        new FilterArrayCondition({
                            passFilterCount: 'not-object',
                            elementFilter: { isType: 'null' }
                        })
                    }).toThrow()
                })
            })
            
            describe('elementFilter', () => {
                test('does not exists throw', () => {
                    expect(() => {
                        new FilterArrayCondition({
                            passFilterCount: { eq: 0 }
                        })
                    }).toThrow()
                })
                test('not object throw', () => {
                    expect(() => {
                        new FilterArrayCondition({
                            passFilterCount: { eq: 0 },
                            elementFilter: 'not-object'
                        })
                    }).toThrow()
                })
            })
        })

    })
    
    describe('check function', () => {
        test('input not array return false', () => {
            const cond = new FilterArrayCondition({
                passFilterCount: { eq: 0 },
                elementFilter: { isType: 'null' }
            })
            expect(cond.check('not-array')).toBe(false)
        })
    })
})

