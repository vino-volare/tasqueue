import { TaskDetail, TaskList } from "~/_type/type"

export const isTask = (data: any): data is TaskDetail => {
    return data.projectId !== undefined
}
export const isTaskList = (data: any): data is TaskList => {
    return Array.isArray(data) && (Boolean(data.length) || data[0].projectId !== undefined)
}