import { objectNotArrayNotNull } from "./utils"

it('null fails', () => {
    expect(objectNotArrayNotNull(null)).toEqual(false)
})