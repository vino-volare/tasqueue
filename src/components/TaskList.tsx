import { Component, For } from "solid-js";
import { priorityTaskAndProj } from "~/_function/calculation/calculation";
import { sortTaskByTotal } from "~/_function/sort/sort";
import { getProjects, getTasks } from "~/_repository/state/data";
import { setIsEdit } from "~/_repository/state/view-state";
import { deleteData } from "~/_usecase/control-data";
import { searchProject } from "~/search/search";
import { test } from "~/test/test";

const TaskListView: Component = () => {
    return(
        <ul>
            タスク
            <For each={getTasks}>
                {
                    (data) =>
                    <li>
                        <details>
                            <summary>
                                <h2>{data.name}</h2>
                                <h6>{searchProject(data.projectId, getProjects).name}</h6>
                                <p>{data.status}</p>
                                <p>{priorityTaskAndProj(data, searchProject(data.projectId, getProjects)).totalPriority}</p>
                                <button type="button" title="edit" onClick={() => test.testShow.already(data)}>
                                    edit
                                </button>
                                <button type="button" title="delete" onClick={() => test.testPop(data)}>
                                    x
                                </button>
                            </summary>
                            <section>
                                <h3>重要度</h3>
                                <p>{data.importance}</p>
                            </section>
                            <section>
                                <h3>緊急度</h3>
                                <p>{data.urgency}</p>
                            </section>
                            <section>
                                <h3>about</h3>
                                <p>{data.about ?? ''}</p>
                            </section>
                        </details>
                    </li>
                }
            </For>
        </ul>
    )
}
export default TaskListView