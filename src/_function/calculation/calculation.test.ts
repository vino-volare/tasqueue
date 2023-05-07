import { calcPriority, sumPriority } from "./calculation"

test('priority calculation', () => {
    expect(calcPriority(1)(1)).toBe(2)
})
test('sum priority test', () => {
    expect(sumPriority(calcPriority(5)(5))(calcPriority(2)(3))).toBe(14.5)
})