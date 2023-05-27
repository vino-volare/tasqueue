import { PersonalLevel, PriorityLevel, ProjectDetail, ProjectList, TaskDetail, TaskList, TotalPriority } from "~/_type/type"
import { isTask, isTaskList } from "../validation/validation"

type CalcPriority = (importance: PersonalLevel) => (urgency: PersonalLevel) => PriorityLevel
export const calcPriority: CalcPriority = (importance) => (urgency) => ((3 * importance) + urgency) / 2 as PriorityLevel


type SumPriority = (project: PriorityLevel) => (task: PriorityLevel) => TotalPriority
export const sumPriority: SumPriority = (project) => (task) => project + task as TotalPriority

type GetListOrder = (list: TaskList | ProjectList, newData: TaskDetail | ProjectDetail) => number
export const getListOrder: GetListOrder = (list, newData) => {
    if (isTaskList(list) && isTask(newData)) {
        return list.filter((l) => {
            if (l.totalPriority !== newData.totalPriority) {
                return l.totalPriority > newData.totalPriority
            }
            return l.timestamp > newData.timestamp
        }).length - 1
    } else if (!isTaskList(list) && !isTask(newData)) {
        return list.filter((l) => {
            if (l.personalPriority != newData.personalPriority) {
                return l.personalPriority > newData.personalPriority
            }
            return l.timestamp > newData.timestamp
        }).length - 1
    }
    return -1
}