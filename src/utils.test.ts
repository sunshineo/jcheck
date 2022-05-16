import { jsontype } from "./utils"

it('null', () => {
    expect(jsontype(null)).toEqual('null')
})
it('boolean', () => {
    expect(jsontype(true)).toEqual('boolean')
    expect(jsontype(false)).toEqual('boolean')
})
it('number', () => {
    expect(jsontype(0)).toEqual('number')
    expect(jsontype(1)).toEqual('number')
})
it('string', () => {
    expect(jsontype('')).toEqual('string')
    expect(jsontype('a')).toEqual('string')
})
it('array', () => {
    expect(jsontype([])).toEqual('array')
    expect(jsontype([{}])).toEqual('array')
})
it('object', () => {
    expect(jsontype({})).toEqual('object')
})
