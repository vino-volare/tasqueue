import { PersonalLevel, PriorityLevel, TotalPriority } from "~/_type/type"

type CalcPriority = (importance: PersonalLevel) => (urgency: PersonalLevel) => PriorityLevel
export const calcPriority: CalcPriority = (importance) => (urgency) => ((3 * importance) + urgency) / 2 as PriorityLevel


type SumPriority = (project: PriorityLevel) => (task: PriorityLevel) => TotalPriority
export const sumPriority: SumPriority = (project) => (task) => project + task as TotalPriority