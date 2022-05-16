export function jsontype(input: any) {
    if (input === undefined) {
        return 'undefined'
    }
    if (input === null) {
        return 'null'
    }
    if (typeof input === 'boolean') {
        return 'boolean'
    }
    if (typeof input === 'number') {
        return 'number'
    }
    if (typeof input === 'string') {
        return 'string'
    }
    if (typeof input === 'object') {
        if (Array.isArray(input)) {
            return 'array'
        }
        return 'object'
    }
    return 'not-json-type'
}