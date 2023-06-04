import { Component, For } from "solid-js";
import { calcPriority } from "~/_function/calculation/calculation";
import { extractTasksById } from "~/_function/parse/parse";
import { sortData } from "~/_function/sort/sort";
import { getProjects, getTasks } from "~/_repository/state/data";
import { setNewProject } from "~/_repository/state/form";
import { setIsEdit } from "~/_repository/state/view-state";
import { ProjectDetail, TaskDetail } from "~/_type/type";
import { deleteData } from "~/_usecase/control-data";
import { test } from "~/test/test";

const ProjectListView: Component = () => {
    return(
        <ul>
            プロジェクト
            <For each={getProjects}>
                {
                    (project) =>
                    <li>
                        <details>
                            <summary>
                                <h2>{project.name}</h2>
                                <p>{project.status}</p>
                                <p>{calcPriority(project.importance, project.urgency)}</p>
                                <button type="button" title="edit" onClick={() => test.testShow.already(project)}>
                                    edit
                                </button>
                                <button type="button" title="delete" onClick={() => test.testPop(project)}>
                                    x
                                </button>
                            </summary>
                            <section>
                                <h3>重要度</h3>
                                <p>{project.importance}</p>
                            </section>
                            <section>
                                <h3>緊急度</h3>
                                <p>{project.urgency}</p>
                            </section>
                            <section>
                                <h3>about</h3>
                                <p>{project.about ?? ''}</p>
                            </section>
                            <section>
                                <h3>tasks</h3>
                                <ul>
                                    <For each={sortData(extractTasksById(getTasks, project))}>
                                        {
                                            (task) =>
                                            <li>
                                                <details>
                                                    <summary>
                                                        <h4>{task.name}</h4>
                                                        <p>{task.status}</p>
                                                        <p>{calcPriority(task.importance, task.urgency)}</p>
                                                        <button type="button" title="edit" onClick={() => test.testShow.already(task)}>
                                                            edit
                                                        </button>
                                                        <button type="button" title="delete" onClick={() => test.testPop(task)}>
                                                            x
                                                        </button>
                                                    </summary>
                                                    <section>
                                                        <h5>重要度</h5>
                                                        <p>{task.importance}</p>
                                                    </section>
                                                    <section>
                                                        <h5>緊急度</h5>
                                                        <p>{task.urgency}</p>
                                                    </section>
                                                    <section>
                                                        <h5>about</h5>
                                                        <p>{task.about ?? ''}</p>
                                                    </section>
                                                </details>
                                            </li>
                                        }
                                    </For>
                                </ul>
                            </section>
                        </details>
                    </li>
                }
            </For>
        </ul>
    )
}

export default ProjectListView