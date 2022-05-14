import ObjectCondition from "./ObjectCondition"

const main = async () => {
    const input1: any = {
        fieldCondition: {
            fieldName: 'strfield',
            allowedTypes: {
                allowNull: true,
                allowBoolean: false,
                allowString: true,
            }
        }
    }
    console.log(input1)
    const cond1 = new ObjectCondition(input1)
    const obj11 = {
        strfield: null,
    }
    console.log(obj11)
    console.log(cond1.check(obj11))
    const obj12 = {
        strfield: true,
    }
    console.log(obj12)
    console.log(cond1.check(obj12))
    const obj13 = {
        strfield: 'xyz',
    }
    console.log(obj13)
    console.log(cond1.check(obj13))

    const input2: any = {
        fieldCondition: {
            fieldName: 'strfield',
            allowedTypes: {
                allowNull: false,
                allowBoolean: false,
                allowString: true,
            },
            stringCondition: {
                eq: 'abc'
            }
        }
    }
    console.log(input2)
    const cond2 = new ObjectCondition(input2)
    const obj21 = {
        strfield: null,
    }
    console.log(obj21)
    console.log(cond2.check(obj21))
    const obj22 = {
        strfield: true,
    }
    console.log(obj22)
    console.log(cond2.check(obj12))
    const obj23 = {
        strfield: 'xyz',
    }
    console.log(obj23)
    console.log(cond2.check(obj23))
    const obj24 = {
        strfield: 'abc',
    }
    console.log(obj24)
    console.log(cond2.check(obj24))
}

main()
