import { Component, For, Show } from "solid-js";
import { extractTasksById } from "~/_function/parse/parse";
import { getProjects, getTasks } from "~/_repository/state/data";
import { deleteData } from "~/_usecase/control-data";

const ProjectListView: Component = () => {
    return(
        <ul>
            <For each={getProjects}>
                {
                    (project, projIndex) =>
                    <li>
                        <details>
                            <summary>
                                <h2>{project.name}</h2>
                                <p>{project.status}</p>
                                <p>{project.personalPriority}</p>
                                <button type="button" title="delete" onClick={() => deleteData(project, projIndex())}>
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
                                <p>{project.about}</p>
                            </section>
                            <section>
                                <h3>task</h3>
                                <ul>
                                    <For each={extractTasksById(getTasks, project.id)}>
                                        {
                                            (task, taskIndex) =>
                                            <details>
                                                <summary>
                                                    <h4>{task.name}</h4>
                                                    <p>{task.status}</p>
                                                    <p>{task.personalPriority}</p>
                                                    <button type="button" title="delete" onClick={() => deleteData(task, taskIndex())}>
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
                                                    <p>{task.about}</p>
                                                </section>
                                            </details>
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