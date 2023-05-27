import "./index.css";
import { Show } from "solid-js";
import { isViewTask } from "~/_repository/state/view-state";
import TaskListView from "~/components/TaskList";
import ProjectListView from "~/components/ProjectList";

export default function Home() {
  return (
    <main>
      <Show when={isViewTask()} fallback={<ProjectListView/>}>
        <TaskListView/>
      </Show>
      <p>
        Visit{" "}
        <a href="https://solidjs.com" target="_blank">
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
    </main>
  );
}
