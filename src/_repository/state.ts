import { createStore } from "solid-js/store";
import { ProjectList, TaskList } from "~/_type/type";
const initialTask: TaskList = []
export const [getTasks, setTasks] = createStore(initialTask)

const initialProject: ProjectList = []
export const [getProjects, setProjects] = createStore(initialProject)