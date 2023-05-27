import { Component, For, Show } from "solid-js";
import { getTasks } from "~/_repository/state/data";
import { deleteData } from "~/_usecase/control-data";

const TaskListView: Component = () => {
    return(
        <ul>
            <For each={getTasks}>
                {
                    (data, index) =>
                    <li>
                        <details>
                            <summary>
                                <h2>{data.name}</h2>
                                <h6>{data.projectName}</h6>
                                <p>{data.status}</p>
                                <p>{data.totalPriority}</p>
                                <button type="button" title="delete" onClick={() => deleteData(data, index())}>
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
                                <p>{data.about}</p>
                            </section>
                        </details>
                    </li>
                }
            </For>
        </ul>
    )
}
export default TaskListView