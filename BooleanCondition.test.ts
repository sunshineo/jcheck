import BooleanCondition from "./BooleanCondition"

describe('constructor works properly', () => {
    it('throw if input is not proper object', () => {
        expect(() => {
            new BooleanCondition('not-object')
        }).toThrow()
    })
})
