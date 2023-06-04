import { ProjectDetail, TaskDetail } from "~/_type/type"

export const isTask = (data: TaskDetail | ProjectDetail): data is TaskDetail => {
    return Object.keys(data).includes('projectId')
}
export const isProject = (data: TaskDetail | ProjectDetail): data is ProjectDetail => {
    return !isTask(data)
}
export const isTaskList = (data: TaskDetail[] | ProjectDetail[]): data is TaskDetail[] => {
    return isTask(data[0])
}
export const isProjectList = (data: TaskDetail[] | ProjectDetail[]): data is ProjectDetail[] => {
    return !isTaskList(data)
}