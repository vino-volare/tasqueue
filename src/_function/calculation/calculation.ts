import { PersonalLevel, ProjectDetail, TaskDetail } from "~/_type/type"

type CalcPriority = (importance: PersonalLevel, urgency: PersonalLevel) => number
export const calcPriority: CalcPriority = (importance, urgency) => ((3 * importance) + urgency) / 2

export const priorityTaskAndProj = (task: TaskDetail, project: ProjectDetail) => {
    const projPriority = calcPriority(project.importance, project.urgency)
    const taskPriority = calcPriority(task.importance, task.urgency)
    const totalPriority = projPriority + taskPriority
    return {totalPriority, projPriority, taskPriority}
}