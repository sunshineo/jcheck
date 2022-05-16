export function objectNotArrayNotNull(obj: any) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}
