import { createStore } from "solid-js/store";
import { ProjectField, TaskField } from "~/_type/type";

const newTaskBase: TaskField = {
    name: 'new task',
    about: undefined,
    status: 'not started',
    importance: 1,
    urgency: 1,
    projectId: '',
    id: undefined,
    timestamp: 1
}
export const [getNewTask, setNewTask] = createStore(newTaskBase)

const newProjectBase: ProjectField = {
    name: 'new project',
    about: undefined,
    status: 'not started',
    importance: 1,
    urgency: 1,
    id: undefined,
    timestamp: 1
}
export const [getNewProject, setNewProject] = createStore(newProjectBase)