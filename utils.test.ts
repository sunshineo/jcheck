import { objectNotArrayNotNull } from "./utils"

it('null fails', () => {
    expect(objectNotArrayNotNull(null)).toEqual(false)
})

it('boolean fails', () => {
    expect(objectNotArrayNotNull(true)).toEqual(false)
    expect(objectNotArrayNotNull(false)).toEqual(false)
})