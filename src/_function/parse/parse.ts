import { ProjectList, TaskDetail, TaskList } from "~/_type/type";

export type TaskForShow = TaskDetail & {
    projectName: string,
}

type GetProjectName = (list: ProjectList) => (id: string) => string
const getProjectName: GetProjectName = (list) => (id) => {
    const nameString = list.find(obj => obj.id == id)?.name
    if (nameString != undefined) {
        return nameString
    } else {
        return 'no project'
    }
}

export type MargeProjectName = (taskList: TaskList) => (projectList: ProjectList) => TaskForShow[]
export const getTaskForShow: MargeProjectName = (taskList) => (projectList) => taskList.map(task => Object.assign(task, {projectName: getProjectName(projectList)(task.projectId)}) as TaskForShow)