import { objectNotArrayNotNull } from "./utils"

it('null fails', () => {
    expect(objectNotArrayNotNull(null)).toEqual(false)
})

it('boolean fails', () => {
    expect(objectNotArrayNotNull(true)).toEqual(false)
    expect(objectNotArrayNotNull(false)).toEqual(false)
})

it('number fails', () => {
    expect(objectNotArrayNotNull(5)).toEqual(false)
})

it('string fails', () => {
    expect(objectNotArrayNotNull('abc')).toEqual(false)
})

it('array fails', () => {
    expect(objectNotArrayNotNull([])).toEqual(false)
    expect(objectNotArrayNotNull([1,2,3])).toEqual(false)
    expect(objectNotArrayNotNull(['a','b'])).toEqual(false)
})

it('object success', () => {
    expect(objectNotArrayNotNull({})).toEqual(true)
    expect(objectNotArrayNotNull({a:'b'})).toEqual(true)
    
})
