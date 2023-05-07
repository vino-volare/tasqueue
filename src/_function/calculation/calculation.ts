export type PersonalLevel = 1 | 2 | 3 | 4 | 5

export type PriorityLevel = 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10

export type CalcPriority = (importance: PersonalLevel) => (urgency: PersonalLevel) => PriorityLevel
export const calcPriority: CalcPriority = (importance: PersonalLevel) => (urgency: PersonalLevel) => ((3 * importance) + urgency) / 2 as PriorityLevel



export type TotalPriority = 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10 | 10.5 | 11 | 11.5 | 12 | 13 | 13.5 | 14 | 14.5 | 15 | 15.5 | 16 | 16.5 | 17 | 17.5 | 18 | 18.5 | 19 | 19.5 | 20

export type SumPriority = (project: PriorityLevel) => (task: PriorityLevel) => TotalPriority
export const sumPriority: SumPriority = (project: PriorityLevel) => (task: PriorityLevel) => project + task as TotalPriority