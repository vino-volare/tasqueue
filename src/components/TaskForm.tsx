import { Component, For, Show } from "solid-js";
import { produce } from "solid-js/store";
import { parseNewTask } from "~/_function/parse/parse";
import { getProjects } from "~/_repository/state/data";
import { formError, setFormError } from "~/_repository/state/error";
import { getNewTask, setNewTask } from "~/_repository/state/form";
import { isEdit, setIsEdit } from "~/_repository/state/view-state";
import { PersonalLevel, Status } from "~/_type/type";
import { setData } from "~/_usecase/control-data";
import { test } from "~/test/test";

const TaskForm: Component<{index?: number}> = () => {

    window.addEventListener('DOMContentLoaded', () => {
        const elm = document.getElementById('task-about')
        if (elm !== null) elm.setAttribute('style', `height: ${elm.scrollHeight}px;`)
    })
    const textAreaHeight = (elm: HTMLTextAreaElement) => {
        elm.style.height = 'auto'
        elm.style.height = `${elm.scrollHeight}px`
    }

    const statusList: Status[] = ['not started', 'working', 'complete']

    return(
        <div>
            <button type="button" onClick={() => {
                setIsEdit({show: false})
                setFormError({status: false})
                }}
            >
                x
            </button>
            <Show when={isEdit.new}>
                <button onClick={() => test.testSaveNew.task()}>新規追加</button>
            </Show>
            <Show when={formError.status}>
                <p>{formError.string}</p>
            </Show>
            <section>
                <label for="name">タスク名</label>
                <input 
                    type="text" 
                    id="name" 
                    value={getNewTask.name} 
                    onChange={(e) => test.testChange.task('name', e.currentTarget.value)}
                />
            </section>
            <section>
                <label for="project">プロジェクト</label>
                <select name="project" id="project" 
                onChange={(e) => test.testChange.task('projectId', e.currentTarget.value)}
                >
                    <option value="">select</option>
                    <For each={getProjects}>
                        {
                            (item) =>
                            <option value={item.id}>{item.name}</option>
                        }
                    </For>
                </select>
            </section>
            <section>
                <label for="status">status: {getNewTask.status}</label>
                <input type="range" id="status" min={0} max={2} step={1} value={statusList.indexOf(getNewTask.status)}
                onInput={(e) => test.testChange.task('status', statusList[parseInt(e.currentTarget.value)])}
                onChange={(e) => test.testChange.task('status', statusList[parseInt(e.currentTarget.value)])}
                />
            </section>
            <section>
                <label for="importance">重要度</label>
                <input type="range" id="importance" min={1} max={5} step={1} value={getNewTask.importance} 
                onInput={(e) => test.testChange.task('importance', parseInt(e.currentTarget.value) as PersonalLevel)} 
                onChange={(e) => test.testChange.task('importance', parseInt(e.currentTarget.value) as PersonalLevel)}
                />
            </section>
            <section>
                <label for="urgency">緊急度</label>
                <input type="range" id="urgency" min={1} max={5} step={1} value={getNewTask.urgency} 
                onInput={(e) => test.testChange.task('urgency', parseInt(e.currentTarget.value) as PersonalLevel)} 
                onChange={(e) => test.testChange.task('urgency', parseInt(e.currentTarget.value) as PersonalLevel)}
                />
            </section>
            <section>
                <label for="task-about">about</label>
                <textarea name="about" id="task-about"
                onInput={(e) => {
                    textAreaHeight(e.currentTarget)
                    test.testChange.task('about', e.currentTarget.value)
                }}
                >{getNewTask.about ?? ''}</textarea>
            </section>
        </div>
    )
}
export default TaskForm