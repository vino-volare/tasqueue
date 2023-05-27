import compare from "just-compare"
import { getListOrder } from "~/_function/calculation/calculation"
import { insertData, popData, sortProject, sortTask } from "~/_function/sort/sort"
import { isTask, isTaskList } from "~/_function/validation/validation"
import { GetDbError, deleteDataFromDB, putDataToDB } from "~/_repository/db/indexed-db"
import { getProjects, getTasks } from "~/_repository/state/data"
import { setProjects, setTasks } from "~/_repository/state/data"
import { setErrorFlag } from "~/_repository/state/error"
import { ProjectDetail, TaskDetail } from "~/_type/type"

type SetData = (data: TaskDetail | ProjectDetail, index?: number) => void
export const setData: SetData = async(newData, index) => {
    if (isTask(newData)) {
        const order = index ?? getListOrder(getTasks, newData)
        setTasks(l => insertData(l, newData, order))
        
        const {data, error} = await putDataToDB(newData)
        if (data !== undefined && isTaskList(data) && compare(getTasks, sortTask(data))) return

        setErrorFlag('dataMismatchError', true)
        if (error !== undefined) {
            if (error.constructor === GetDbError) setErrorFlag('getDbError', true)
        }
        window.setTimeout(() => {setErrorFlag('dataMismatchError', false)}, 5000)
        setTasks(l => popData(l, order))
    } else {
        const order = index ?? getListOrder(getProjects, newData)
        setProjects(l => insertData(l, newData, order))
    
        const {data, error} = await putDataToDB(newData)
        if (data !== undefined && !isTaskList(data) && compare(getTasks, sortProject(data))) return
    
        setErrorFlag('dataMismatchError', true)
        if (error !== undefined) {
            if (error.constructor === GetDbError) setErrorFlag('getDbError', true)
        }
        window.setTimeout(() => {setErrorFlag('dataMismatchError', false)}, 5000)
        setProjects(l => popData(l, order))
    }

}

type DeleteData = (delData: TaskDetail | ProjectDetail, index: number) => void
export const deleteData: DeleteData = async(delData, index) => {
    if (isTask(delData)) {
        setTasks(l => popData(l, index))
        const {data, error} = await deleteDataFromDB(delData)
        if (data !== undefined && isTaskList(data) && compare(getTasks, sortTask(data))) return

        setErrorFlag('dataMismatchError', true)
        if (error !== undefined) {
            if (error.constructor === GetDbError) setErrorFlag('getDbError', true)
        }
        window.setTimeout(() => {setErrorFlag('dataMismatchError', false)}, 5000)
        setTasks(l => insertData(l, delData, index))
        return
    }
    setProjects(l => popData(l, index))
    const {data, error} = await deleteDataFromDB(delData)
    if (data !== undefined && !isTaskList(data) && compare(getProjects, sortProject(data))) return

    setErrorFlag('dataMismatchError', true)
    if (error !== undefined) {
        if (error.constructor === GetDbError) setErrorFlag('getDbError', true)
    }
    window.setTimeout(() => {setErrorFlag('dataMismatchError', false)}, 5000)
    setProjects(l => insertData(l, delData, index))
}