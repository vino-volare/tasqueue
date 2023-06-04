import { isTaskList } from "~/_function/validation/validation";
import { getListFromDB } from "~/_repository/db/indexed-db";
import { setProjects, setTasks } from "~/_repository/state/data";
import { setErrorFlag } from "~/_repository/state/error";
import { ProjectList, TaskList } from "~/_type/type";

const initialTask = async(): Promise<TaskList> => {
    const { data, error } = await getListFromDB('tasks')
    if (data !== undefined) {
        if (!data.length) return []
        if (isTaskList(data)) return data
        setErrorFlag('getDbError', true)
        console.error('this is not tasks')
        return []
    }
    setErrorFlag('getDbError', true)
    console.error(error.message)
    if (!error.value.length) return []
    if (isTaskList(error.value)) return error.value
    return []
}

const initialProject = async(): Promise<ProjectList> => {
    const { data, error } = await getListFromDB('projects')
    if (data !== undefined) {
        if (!data.length) return []
        if (!isTaskList(data)) return data
        setErrorFlag('getDbError', true)
        console.error('this is not projects')
        return []
    }
    setErrorFlag('getDbError', true)
    console.error(error.message)
    if (!error.value.length) return []
    if (!isTaskList(error.value)) return error.value
    return[]
}

setTasks(await initialTask())

setProjects(await initialProject())