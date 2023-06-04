export type PersonalLevel = 1 | 2 | 3 | 4 | 5
type PriorityLevel = 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10
type TotalPriority = 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10 | 10.5 | 11 | 11.5 | 12 | 13 | 13.5 | 14 | 14.5 | 15 | 15.5 | 16 | 16.5 | 17 | 17.5 | 18 | 18.5 | 19 | 19.5 | 20
export type Status = 'not started' | 'working' | 'complete'

export type ProjectDetail = {
    name: string,
    id: string,
    timestamp: number,
    importance: PersonalLevel,
    urgency: PersonalLevel,
    status: Status,
    about?: string,
}

export type TaskDetail = ProjectDetail & {
    projectId: string,
}

export type ProjectField = {
    name: string,
    id?: string,
    timestamp: number,
    importance: PersonalLevel,
    urgency: PersonalLevel,
    status: Status,
    about?: string,
}
export type TaskField = ProjectField & {
    projectId: string;
}

export type Detail<T> = T extends TaskDetail ? T : ProjectDetail

export type TaskList = TaskDetail[]

export type ProjectList = ProjectDetail[]

export type EditStatus = {isTask: boolean, show: boolean, new: boolean}