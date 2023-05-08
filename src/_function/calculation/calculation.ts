import { PersonalLevel, PriorityLevel, TotalPriority } from "~/_type/type"

export type CalcPriority = (importance: PersonalLevel) => (urgency: PersonalLevel) => PriorityLevel
export const calcPriority: CalcPriority = (importance) => (urgency) => ((3 * importance) + urgency) / 2 as PriorityLevel


export type SumPriority = (project: PriorityLevel) => (task: PriorityLevel) => TotalPriority
export const sumPriority: SumPriority = (project) => (task) => project + task as TotalPriority