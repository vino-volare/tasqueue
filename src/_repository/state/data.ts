import { createStore } from "solid-js/store";
import { ProjectDetail, ProjectList, TaskDetail, TaskList } from "~/_type/type";


const initialTask: TaskDetail[] = []
export const [getTasks, setTasks] = createStore(initialTask)

const initialProject: ProjectDetail[] = []
export const [getProjects, setProjects] = createStore(initialProject)