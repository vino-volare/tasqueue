export type PersonalLevel = 1 | 2 | 3 | 4 | 5
export type PriorityLevel = 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10
export type TotalPriority = 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10 | 10.5 | 11 | 11.5 | 12 | 13 | 13.5 | 14 | 14.5 | 15 | 15.5 | 16 | 16.5 | 17 | 17.5 | 18 | 18.5 | 19 | 19.5 | 20
export type Status = 'not started' | 'working' | 'complete'

type Detail = {
    name: string,
    id: string,
    timestamp: number,
    importance: PersonalLevel,
    urgency: PersonalLevel,
    personalPriority: PriorityLevel,
    status: Status,
    about: string | undefined,
}

export type TaskDetail = Detail & {
    projectId: string,
    totalPriority: TotalPriority,
}
export type TaskList = Array<TaskDetail>
export type ViewTask = TaskDetail & {
    projectName: string,
}

export type ProjectDetail = Detail & {
    tasks: TaskList,
}
export type ProjectList = Array<ProjectDetail>