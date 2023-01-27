# jcheck
A library check if a JSON satisfies conditions. The conditions are specified in JSON as well so it can be easily displayed/edited by UI, passed around in http JSON calls, and saved in database or file

## Install
```bash
npm i @sunshineo/jcheck
```
## Import
NodeJS
```js
const jcheck = require('@sunshineo/jcheck')
```
TypeScript
```ts
import * as jcheck from '@sunshineo/jcheck'
```
## Examples
```js
// No field with name field1
const condition1JSON = {
    field: {
        fieldName: 'field1',
        fieldValue: {
            isType: 'undefined',
        }
    }
}
const condition1 = new jcheck.ObjectCondition(condition1JSON)
condition1.check({}) // true
condition1.check({ field1: null }) // false

// Field1 is null
const condition2JSON = {
    field: {
        fieldName: 'field1',
        fieldValue: {
            isType: 'null',
        }
    }
}

// Field1 does not exists or is null
const condition3JSON = {
    any: [
        condition1JSON,
        condition2JSON
    ]
}

// Another way to do the above is
const condition3JSON = {
  field: {
    fieldName: 'field1',
    fieldValue: {
      or: [
        { isType: 'undefined' },
        { isType: 'null' },
      ]
    }
  }
}

// Field2 is string 'a'
const condition4JSON = {
    field: {
        fieldName: 'field2',
        fieldValue: {
            isType: 'string',
            stringCondition: {
                eq: 'a'
            }
        }
    }
}
// Field2 is string 'a' or starts with b/B
const condition5JSON = {
    field: {
        fieldName: 'field2',
        fieldValue: {
            isType: 'string',
            stringCondition: {
                any: [
                    { eq: 'a' },
                    { regex: '^b', caseInsensitive: true }
                ]
            }
        }
    }
}

// Field3 is number between 0 and 1
const condition6JSON = {
    field: {
        fieldName: 'field3',
        fieldValue: {
            isType: 'number',
            numberCondition: {
                all: [
                    { gt: 0 },
                    { lt: 1 }
                ]
            }
        }
    }
}

// Put above together:
// Field1 does not exists or is null. AND
// Field2 is string 'a' or 'b'. AND
// Field3 is number between 0 and 1
const condition7JSON = {
    all: [
        condition3JSON,
        condition5JSON,
        condition6JSON
    ]
}

// Date is not JSON type but JS type so special support
const condition7JSON = {
    field: {
      fieldName: 'time',
      any: [
        {
          all: [
            {isType: 'date', before: '2022'},
            {isType: 'date', after: '2022'},
          ]
        },
        { isType: 'undefined' }
      ]
    }
}

// nums is an array of numbers or empty
const condition8JSON = {
  field: {
    fieldName: 'nums',
    fieldValue: {
      isType: 'array',
      arrayCondition: {
        filterArray: {
          elementFilter: {
            not: {
              isType: 'number',
            }
          },
          passFilterCount: {
            eq: 0,
          }
        }
      }
    }
  }
}


// Any lineItem sku equals SKU1 or SKU2
const condition8JSON = {
  field: {
    fieldName: 'lineItem',
    fieldValue: {
      isType: 'array',
      arrayCondition: {
        filterArray: {
          elementFilter: {
            isType: 'object',
            objectCondition: {
              field: 'sku',
              fieldValue: {
                isType: 'string',
                stringCondition: {
                  any:[
                    { eq: 'SKU1' },
                    { eq: 'SKU2' },
                  ]
                }
              }
            }
          },
          passFilterCount: {
            gt: 0
          }
        }
      }
    }
  }
}

```

## References
### ObjectCondition
Class constructor input allows one and only one of the following
* field: FieldCondition
  * Specify the condition on one field in the object. See FieldCondition for details
* fieldNames: ArrayCondition
  * Specify the condition based on all the field names in the object. For example, have more than 3 fields `{ fieldNames: { gt: 3 }}` . See ArrayCondition
* fieldValues: ArrayCondition
  * Specify the condition based on all the field values in the object.
* all?: ObjectCondition[]
  * An array of child ObjectCondition. Only returns true if all of the child conditions returns true.
* any?: ObjectCondition[]
  * An array of child ObjectCondition. Returns true if any of the child conditions returns true.
* not?: ObjectCondition
  * A child ObjectCondition. Returns the opposite of the child condition result
### FieldCondition
Class constructor input has the following
* fieldName: string
  * Required. The name of the field
* fieldValue?: FieldValueCondition
  * Required. The required condition for the value. See FieldValueCondition for details

### FieldValueCondition
Class constructor input has one of the following
* all?: FieldValueCondition[]
  * An array of child FieldValueCondition. Only returns true if all of the child conditions returns true.
* any?: FieldValueCondition[]
  * An array of child FieldValueCondition. Returns true if any of the child conditions returns true.
* not?: FieldValueCondition
  * A child FieldValueCondition. Returns the opposite of the child condition result
* isType?: string
  * Required. One of the following string values:
    * "undefined": The field does not exist in the object
    * "null": The field exists in the object and value is null
    * "boolean": The field value is true or false. Can specify additional requirement using booleanCondition below
    * "number": The field is a number. Can specify additional requirement using numberCondition below
    * "string": The field is a string. Can specify additional requirement using stringCondition below
    * "array": The field is a array. Can specify additional requirement using arrayCondition below
    * "object": The field is a object. Can specify additional requirement using objectCondition below
    * "date": The field is a string representing a date time. Can specify additional requirement using dateCondition below

If isType specified, must have one and only one of the following, matching the isType specified above
* booleanCondition?: BooleanCondition
* stringCondition?: StringCondition
* numberCondition?: NumberCondition
* objectCondition?: ObjectCondition
* arrayCondition?: ArrayCondition
* dateCondition?: DateCondition

### BooleanCondition
Class constructor input allows one and only one of the following
* eq?: boolean
  * The value equals specified true or false
* ne?: boolean
  * The value does not equal specified true or false

### NumberCondition
Class constructor input allows one and only one of the following
* eq?: number
  * The value equals to the specified number
* ne?: number
  * The value does not equal to the specified number
* gt?: number
  * The value greater than the specified number
* gte?: number
  * The value greater than or equal to the specified number
* lt?: number
  * The value less than the specified number
* lte?: number
  * The value less than or equal to the specified number
* all?: NumberCondition[]
  * An array of child NumberCondition. Only returns true if all of the child conditions returns true.
* any?: NumberCondition[]
  * An array of child NumberCondition. Returns true if any of the child conditions returns true.
* not?: NumberCondition
  * A child NumberCondition. Returns the opposite of the child condition result

### StringCondition
Class constructor input allows one and only one of the following
* eq?: string
  * The value equals to the specified string
* ne?: string
  * The value does not equals to the specified string
* startsWith?: string
  * The value string starts with to the specified string
* endsWith?: string
  * The value string ends with to the specified string
* lengthCondition?: NumberCondition
  * The value string length satisfies the specified NumberCondition
* regex?: RegExp
  * The value string satisfies the specified regular expression
* all?: StringCondition[]
  * An array of child StringCondition. Only returns true if all of the child conditions returns true.
* any?: StringCondition[]
  * An array of child StringCondition. Returns true if any of the child conditions returns true.
* not?: StringCondition
  * A child StringCondition. Returns the opposite of the child condition result

Optional config
* caseInsensitive: boolean = false
  * Default to false. If set to true, eq, ne, startsWith, endsWith, will test regardless of case

### DateCondition
Class constructor input allows one and only one of the following
* before?: string
  * Requires a string that JavaScript can parse into a JavaScript Date type. For example: "2022-05-16T07:45:07.172Z" or "Mon May 16 2022"
  * If the value is also a string of a Date and before this, returns true
* after?: string
  * If the value is also a string of a Date and after this, returns true
* all?: DateCondition[]
  * An array of child DateCondition. Only returns true if all of the child conditions returns true.
* any?: DateCondition[]
  * An array of child DateCondition. Returns true if any of the child conditions returns true.
* not?: DateCondition
  * A child DateCondition. Returns the opposite of the child condition result

### ArrayCondition
Class constructor input allows one and only one of the following
* size?: NumberCondition
  * Size of the array satisfies the NumberCondition
* hasElement?: FieldValueCondition
  * Array has any element that satisfies the FieldValueCondition
* hasNoElement?: FieldValueCondition
  * Array does not have any element that satisfies the FieldValueCondition
* filterArray?: FilterArrayCondition
  * Array elements satisfies FilterArrayCondition. See below for details
* all?: ArrayCondition[]
  * An array of child ArrayCondition. Only returns true if all of the child conditions returns true.
* any?: ArrayCondition[]
  * An array of child ArrayCondition. Returns true if any of the child conditions returns true.
* not?: ArrayCondition
  * A child ArrayCondition. Returns the opposite of the child condition result

### FilterArrayCondition
Class constructor input requires the following:
* elementFilter: FieldValueCondition
  * A FieldValueCondition that will check each element with
* passFilterCount: NumberCondition
  * For elements passed the filter, check the count witht the specified NumberCondition
