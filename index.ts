import StringCondition from "./StringCondition"

const main = async () => {
    const cond1Json = {
        eq: 'abc',
        caseInsensitive: true,
    }
    const cond1 = new StringCondition(cond1Json)
    console.log(cond1.check(""))
    console.log(cond1.check("Ab"))
    console.log(cond1.check("abc"))
}

main()
