export type Level = 1 | 2 | 3 | 4 | 5

export type CalcPriority = (importance: Level) => (urgency: Level) => number
export const calcPriority: CalcPriority = (importance: Level) => (urgency: Level) => {
    return ((3 * importance) + urgency) / 2
}