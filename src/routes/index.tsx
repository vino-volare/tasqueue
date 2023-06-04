import "./index.css";
import { Show } from "solid-js";
import { isEdit, isViewTask } from "~/_repository/state/view-state";
import TaskListView from "~/components/TaskList";
import ProjectListView from "~/components/ProjectList";
import TaskForm from "~/components/TaskForm";
import ProjectForm from "~/components/ProjectForm";
import ErrorView from "~/components/Error";
import TabBar from "~/components/TabBar";
import { getProjects } from "~/_repository/state/data";

export default function Home() {
  return (
    <main>
      {getProjects.length}
      <TabBar/>
      <Show when={isViewTask()} fallback={<ProjectListView/>}>
        <TaskListView/>
      </Show>
      <Show when={isEdit.show}>
        <Show when={isEdit.isTask} fallback={<ProjectForm index={isEdit.index}/>}>
          <TaskForm index={isEdit.index}/>
        </Show>
      </Show>
      <ErrorView/>
    </main>
  );
}
