import { ProjectDetail, ProjectList, TaskDetail, TaskList } from "~/_type/type"
import { getListOrder } from "../calculation/calculation"

type SortTask = (list: TaskList) => TaskList
export const sortTask: SortTask = (list) => list.sort((a, b) => {
    if (a.totalPriority != b.totalPriority) {
        return b.totalPriority - a.totalPriority
    } else {
        return a.timestamp - b.timestamp
    }
})

type SortProject = (list: ProjectList) => ProjectList
export const sortProject: SortProject = (list) => list.sort((a, b) => {
    if (a.personalPriority != b.personalPriority) {
        return b.personalPriority - a.personalPriority
    } else {
        return a.timestamp - b.timestamp
    }
})

export const sortTaskInProject: SortTask = (list) => list.sort((a, b) => {
    if (a.personalPriority != b.personalPriority) {
        return b.personalPriority - a.personalPriority
    } else {
        return a.timestamp - b.timestamp
    }
})

export const insertData = <T>(list: T[], data: T, order: number) => {
    list.splice(order, 0, data)
    return list
}

export const popData = <T>(list: T[], order: number) => {
    delete list[order]
    return list
}