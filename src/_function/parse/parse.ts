import { NewProject, NewTask, ProjectDetail, TaskDetail, TaskList } from "~/_type/type";
import { calcPriority, sumPriority } from "../calculation/calculation";

type ParseNewTask = (input: NewTask) => TaskDetail

export const parseNewTask: ParseNewTask = (input) => {
    const calculatedPriority = calcPriority(input.importance)(input.urgency)
    const timestamp = Date.now()
    const parsed: TaskDetail = {
        name: input.name,
        id: timestamp.toString(16) + Math.floor(1000 * Math.random()).toString(16),
        timestamp: timestamp,
        importance: input.importance,
        urgency: input.urgency,
        personalPriority: calculatedPriority,
        totalPriority: sumPriority(input.projectPriority)(calculatedPriority),
        status: input.status,
        about: input.about,
        projectId: input.projectId,
        projectName: input.projectName
    }
    return parsed
}

type ParseNewProject = (input: NewProject) => ProjectDetail

export const parseNewProject: ParseNewProject = (input) => {
    const timestamp = Date.now()
    const parsed: ProjectDetail = {
        name: input.name,
        id: timestamp.toString(16) + Math.floor(1000 * Math.random()).toString(16),
        timestamp: timestamp,
        importance: input.importance,
        urgency: input.urgency,
        personalPriority: calcPriority(input.importance)(input.urgency),
        status: input.status,
        about: input.about
    }
    return parsed
}

type ExtractTasksById = (list: TaskList, id: string) => TaskList
export const extractTasksById: ExtractTasksById = (list, id) => list.filter(data => data.projectId === id)