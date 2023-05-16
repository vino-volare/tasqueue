import { ProjectList, TaskList, ProjectDetail, TaskDetail } from "~/_type/type";
import Dexie, { type Table } from "dexie";
import { Result, catchErrorType } from "~/_type/error-type";

class TasqueueDexie extends Dexie {
    projects!: Table<ProjectDetail>
    tasks!: Table<TaskDetail>

    constructor() {
        super('myDatabase')
        this.version(1).stores({
            projects: 'id',
            tasks: 'id'
        })
    }
}

const db = new TasqueueDexie()

type GetDataByDB = (objStore: 'projects'| 'tasks') => Promise<Result<TaskList | ProjectList, Error>>

export const getListByDB: GetDataByDB = async (objStore) => {
    try {
        return Result.data(await db[objStore].toArray())
    } catch (err) {
        return Result.error(catchErrorType('getListByDB')(err))
    }
}

const isTask = (data: any): data is TaskDetail => {
    return data.projectId !== undefined
}

type EditDataByDB = (data: TaskDetail | ProjectDetail) => Promise<Result<TaskList | ProjectList, Error>>

export const PutDataByDB: EditDataByDB = async (newData) => {
    try{
        if (isTask(newData)) {
            await db.tasks.put(newData)

            const { data, error } = await getListByDB('tasks')
            if (data !== undefined)  {
                return Result.data(data)
            }
            return Result.error(error)
        } else {
            await db.projects.put(newData)

            const { data, error } = await getListByDB('projects')
            if (data !== undefined) {
                return Result.data(data)
            }
            return Result.error(error)
        }
    } catch (err) {
        return Result.error(catchErrorType('addDataByDB')(err))
    }
}
export const deleteDataByDB: EditDataByDB = async (deleteData) => {
    try {
        if (isTask(deleteData)) {
            await db.tasks.delete(deleteData.id)
            
            const { data, error } = await getListByDB('tasks')
            if (data !== undefined) {
                return Result.data(data)
            }
            return Result.error(error)
        } else {
            await db.projects.delete(deleteData.id)

            const { data, error } = await getListByDB('projects')
            if (data !== undefined) {
                return Result.data(data)
            }
            return Result.error(error)
        }
    } catch (err) {
        return Result.error(catchErrorType('deleteDataByDB')(err))
    }
}