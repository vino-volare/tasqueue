import { ProjectList, TaskList } from "~/_type/type"

export type SortTask = (list: TaskList) => TaskList
export const sortTask: SortTask = (list) => list.sort((a, b) => {
    if (a.totalPriority != b.totalPriority) {
        return b.totalPriority - a.totalPriority
    } else {
        return a.timestamp - b.timestamp
    }
})

export type SortProject = (list: ProjectList) => ProjectList
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