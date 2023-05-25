import { isTask } from "~/_function/validation/validation"
import { setProjects, setTasks } from "~/_repository/state/data"
import { ProjectDetail, TaskDetail } from "~/_type/type"

type SetData = (data: TaskDetail | ProjectDetail) => void
export const setData: SetData = (data) => {
    if (isTask(data)) {
        setTasks(l => [...l, data])
        return
    }
    setProjects(l => [...l, data])
    return
}