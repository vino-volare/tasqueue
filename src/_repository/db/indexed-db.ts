import { ProjectList, TaskList, ProjectDetail, TaskDetail } from "~/_type/type";
import Dexie, { type Table } from "dexie";
import { Result, catchErrorType } from "~/_type/error-type";
import { isTask } from "~/_function/validation/validation";

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


export class GetDbError extends Error {
    value: TaskList | ProjectList
    constructor(value: TaskList | ProjectList, message?: string, options?: ErrorOptions) {
        super(message, options)
        this.value = value
    }
}

type GetDataFromDB = (objStore: 'projects'| 'tasks') => Promise<Result<TaskList | ProjectList, GetDbError>>

export const getListFromDB: GetDataFromDB = async (objStore) => {
    try {
        return Result.data(await db[objStore].toArray())
    } catch (err) {
        const getError = new GetDbError([], catchErrorType('getListFromDB')(err).message)
        return Result.error(getError)
    }
}


export class PutDbError extends Error {
    value: TaskList | ProjectList
    constructor(value: TaskList | ProjectList, message?: string, options?: ErrorOptions) {
        super(message, options)
        this.value = value
    }
}

type PutDataToDB = (data: TaskDetail | ProjectDetail) => Promise<Result<TaskList | ProjectList, GetDbError | PutDbError>>

export const putDataToDB: PutDataToDB = async (newData) => {
    if (isTask(newData)) {
        let putTaskError = null
        try {
            await db.tasks.put(newData)
        } catch (error) {
            putTaskError = catchErrorType('putting task in putDataToDB')(error)
        } finally {
            const { data, error } = await getListFromDB('tasks')
            if (data !== undefined)  {
                if (putTaskError !== null) {
                    return Result.error(new PutDbError(data, putTaskError.message))
                }
                return Result.data(data)
            }
            return Result.error(error)
        }
    } else {
        let putProjectError = null
        try {
            await db.projects.put(newData)
        } catch (error) {
            putProjectError = catchErrorType('putting project in putDataToDB')(error)
        } finally {
            const { data, error } = await getListFromDB('projects')
            if (data !== undefined) {
                if (putProjectError === null) {
                return Result.data(data)
                }
                return Result.error(new PutDbError(data, putProjectError.message))
            }
            return Result.error(error)
        }
    }
}


export class DeleteDbError extends Error {
    value: TaskList | ProjectList
    constructor(value: TaskList | ProjectList, message?: string, options?: ErrorOptions) {
        super(message, options)
        this.value = value
    }
}

type DeleteDataFromDB = (data: TaskDetail | ProjectDetail) => Promise<Result<TaskList | ProjectList, GetDbError | DeleteDbError>>

export const deleteDataFromDB: DeleteDataFromDB = async (deleteData) => {
    if (isTask(deleteData)) {
        let deleteTaskError = null
        try {
            await db.tasks.delete(deleteData.id)
        } catch (error) {
            deleteTaskError = catchErrorType('deleting task in deleteDataFromDB')(error)
        } finally {
            const { data, error } = await getListFromDB('tasks')
            if (data !== undefined) {
                if (deleteTaskError === null) {
                    return Result.data(data)
                }
                return Result.error(new DeleteDbError(data, deleteTaskError.message))
            }
            return Result.error(error)
        }
    } else {
        let deleteProjectError = null
        try {
            await db.projects.delete(deleteData.id)
        } catch (error) {
            deleteProjectError = catchErrorType('deleting project in deleteDataFromDB')(error)
        } finally {
            const { data, error } = await getListFromDB('projects')
            if (data !== undefined) {
                if (deleteProjectError === null) {
                    return Result.data(data)
                }
                return Result.error(new DeleteDbError(data, deleteProjectError.message))
            }
            return Result.error(error)
        }
    }
}