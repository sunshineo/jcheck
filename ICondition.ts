interface CheckFunc {
    (input: any): boolean;
}
export default interface ICondition {
    check: CheckFunc
}