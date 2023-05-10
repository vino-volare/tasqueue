import { ProjectList, TaskList } from "~/_type/type";

type GetProjectName = (list: ProjectList) => (id: string) => string
const getProjectName: GetProjectName = (list) => (id) => {
    const nameString = list.find(obj => obj.id == id)?.name
    if (nameString != undefined) {
        return nameString
    } else {
        return 'no project'
    }
}

type MargeProjectName = (taskList: TaskList) => (projectList: ProjectList) => TaskList
export const margeProjectName: MargeProjectName = (taskList) => (projectList) => taskList.map(task => Object.assign(task, {projectName: getProjectName(projectList)(task.projectId)}))

type ReduceProjectName = (taskList: TaskList) => TaskList
export const reduceProjectName: ReduceProjectName = (taskList) => taskList.map(task => {
    delete task.projectName
    return task
})