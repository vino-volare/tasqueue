import { margeProjectName } from "~/_function/parse/parse";
import { sortTask } from "~/_function/sort/sort";
import { setTasks } from "~/_repository/state";
import { ProjectList, TaskList } from "~/_type/type";

type ShowTask = (taskList: TaskList) => (projectList: ProjectList) => void
export const showTask:ShowTask = (taskList) => (projectList) => setTasks(margeProjectName(sortTask(taskList))(projectList))