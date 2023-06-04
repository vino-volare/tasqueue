import { Detail, ProjectDetail } from "~/_type/type"

export const getListIndex = <T>(id: string, list: Detail<T>[]): number => {
    return list.findIndex(l => l.id === id)
}
export const searchProject = (projectId: string, projectList: ProjectDetail[]): ProjectDetail => {
    return projectList[projectList.findIndex(l => l.id === projectId)]
}