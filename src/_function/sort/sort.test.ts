import { calcPriority} from "./sort"

test('priority calculation', () => {
    expect(calcPriority(1)(1)).toBe(2)
})