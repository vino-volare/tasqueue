import { Detail, ProjectDetail, TaskDetail } from "~/_type/type"
import { calcPriority, priorityTaskAndProj } from "../calculation/calculation"
import { searchProject } from "~/search/search"

export const sortTaskByTotal = (taskList :TaskDetail[], projectList: ProjectDetail[]):TaskDetail[] => {
    if (!taskList.length) return []
    return taskList.sort((a, b) => {
        const dataA = priorityTaskAndProj(a, searchProject(a.projectId, projectList))
        const dataB = priorityTaskAndProj(b, searchProject(b.projectId, projectList))
        if (dataA.totalPriority === dataB.totalPriority) return a.timestamp - b.timestamp
        return dataB.totalPriority - dataA.totalPriority
    })
}

export const sortData = <T extends TaskDetail | ProjectDetail>(list: Detail<T>[]): Detail<T>[] => {
    if (!list.length) return []
    return list.sort((a, b) => {
        const priorityA = calcPriority(a.importance, a.urgency)
        const priorityB = calcPriority(b.importance, b.urgency)
        if (priorityA === priorityB) return a.timestamp - b.timestamp
        return priorityB - priorityA
    })
}
