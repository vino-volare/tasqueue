import { TaskForShow, getTaskForShow } from "~/_function/parse/parse";
import { sortTask } from "~/_function/sort/sort";
import { ProjectList, TaskList } from "~/_type/type";

type ShowTask = (taskList: TaskList) => (projectList: ProjectList) => TaskForShow[]
export const showTask:ShowTask = (taskList) => (projectList) => getTaskForShow(sortTask(taskList))(projectList)