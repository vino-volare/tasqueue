import { ProjectDetail, ProjectField, TaskDetail, TaskField } from "~/_type/type";

export const parseNewTask = (input: TaskField): TaskDetail => {
    const timestamp = Date.now()
    const parsed: TaskDetail = {
        name: input.name,
        id: timestamp.toString(16) + Math.floor(1000 * Math.random()).toString(16),
        timestamp: timestamp,
        importance: input.importance,
        urgency: input.urgency,
        status: input.status,
        about: input.about,
        projectId: input.projectId
    }
    return parsed
}

export const parseNewProject= (input: ProjectField): ProjectDetail => {
    const timestamp = Date.now()
    const parsed: ProjectDetail = {
        name: input.name,
        id: timestamp.toString(16) + Math.floor(1000 * Math.random()).toString(16),
        timestamp: timestamp,
        importance: input.importance,
        urgency: input.urgency,
        status: input.status,
        about: input.about
    }
    return parsed
}

type ExtractTasksById = (list: TaskDetail[], project: ProjectDetail) => TaskDetail[]
export const extractTasksById: ExtractTasksById = (list, project) => {
    if (!list.length) return []
    return list.filter(data => data.projectId === project.id)
}