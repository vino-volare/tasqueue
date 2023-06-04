import { produce } from "solid-js/store";
import { calcPriority, priorityTaskAndProj } from "~/_function/calculation/calculation";
import { extractTasksById, parseNewProject, parseNewTask } from "~/_function/parse/parse";
import { isTask } from "~/_function/validation/validation";
import { getProjects, getTasks, setProjects, setTasks } from "~/_repository/state/data";
import { setFormError } from "~/_repository/state/error";
import { getNewProject, getNewTask, setNewProject, setNewTask } from "~/_repository/state/form";
import { isViewTask, setIsEdit } from "~/_repository/state/view-state";
import { ProjectDetail, ProjectField, TaskDetail, TaskField } from "~/_type/type";
import { getListIndex, searchProject } from "~/search/search";

const testPop = (data: TaskDetail | ProjectDetail): void => {
    if (isTask(data)) return setTasks(produce(l => l.splice(getListIndex(data.id, l),1)))

    setTasks(produce(l => extractTasksById(l, data).forEach(task => l.splice(getListIndex(task.id, l)))))
    setProjects(produce(l => l.splice(getListIndex(data.id, l),1)))
}


const setTask = <T extends keyof TaskDetail>(key: T, value: TaskDetail[T]): void => {
    if (getNewTask.id !== undefined) {
        setTasks(getListIndex(getNewTask.id, getTasks), key, value)
        setTasks(produce(l => l.sort((a, b) => {
            const dataA = priorityTaskAndProj(a, searchProject(a.projectId, getProjects))
            const dataB = priorityTaskAndProj(b, searchProject(b.projectId, getProjects))
            if (dataA.totalPriority === dataB.totalPriority) return a.timestamp - b.timestamp
            return dataB.totalPriority - dataA.totalPriority
        })))
    }
    setNewTask(key, value)
}
const setProject = <T extends keyof ProjectDetail>(key: T, value: ProjectDetail[T]) => {
    if (getNewProject.id !== undefined) {
        setProjects(getListIndex(getNewProject.id, getProjects), key, value)
        setProjects(produce(l => l.sort((a, b) => {
            const priorityA = calcPriority(a.importance, a.urgency)
            const priorityB = calcPriority(b.importance, b.urgency)
            if (priorityA === priorityB) return a.timestamp - b.timestamp
            return priorityB - priorityA
        })))
        setTasks(produce(l => l.sort((a, b) => {
            const dataA = priorityTaskAndProj(a, searchProject(a.projectId, getProjects))
            const dataB = priorityTaskAndProj(b, searchProject(b.projectId, getProjects))
            if (dataA.totalPriority === dataB.totalPriority) return a.timestamp - b.timestamp
            return dataB.totalPriority - dataA.totalPriority
        })))
    }
    setNewProject(key, value)
}


const testSaveNewTask = (): void => {
    if (getNewTask.projectId === '') return setFormError(produce(l => l.status = true))
    setFormError(produce(l => l.status = false))
    setTasks(l => [...l, parseNewTask(getNewTask)])
    setTasks(produce(l => l.sort((a, b) => {
        const dataA = priorityTaskAndProj(a, searchProject(a.projectId, getProjects))
        const dataB = priorityTaskAndProj(b, searchProject(b.projectId, getProjects))
        if (dataA.totalPriority === dataB.totalPriority) return a.timestamp - b.timestamp
        return dataB.totalPriority - dataA.totalPriority
    })))
    setIsEdit(produce(l => l.show = false))
}
const testSaveNewProject = (): void => {
    setProjects(l => [...l, parseNewProject(getNewProject)])
    setProjects(produce(l => l.sort((a, b) => {
        const priorityA = calcPriority(a.importance, a.urgency)
        const priorityB = calcPriority(b.importance, b.urgency)
        if (priorityA === priorityB) return a.timestamp - b.timestamp
        return priorityB - priorityA
    })))
    setIsEdit(produce(l => l.show = false))
}


const newProject: ProjectField = {
    name: 'new project',
    about: undefined,
    status: 'not started',
    importance: 1,
    urgency: 1,
    id: undefined,
    timestamp: 1
}
const newTask: TaskField = {
    name: 'new task',
    about: undefined,
    status: 'not started',
    importance: 1,
    urgency: 1,
    projectId: '',
    id: undefined,
    timestamp: 1
}

const testShowNew = (): void => {
    setIsEdit({isTask: isViewTask(), show: true, new: true})
    if (isViewTask()) return setNewTask(newTask)
    setNewProject(newProject)
}
const testShowAlready = (data: TaskDetail | ProjectDetail): void => {
    setIsEdit({isTask: isTask(data), show: true, new: false})
    if (isTask(data)) return setNewTask(data)
    setNewProject(data)
}

export const test = {
    testPop: testPop,
    testChange: {
        task: setTask,
        project: setProject
    },
    testSaveNew: {
        task: testSaveNewTask,
        project: testSaveNewProject
    },
    testShow: {
        new: testShowNew,
        already: testShowAlready
    }
}