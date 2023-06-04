import { Component, Show } from "solid-js";
import { produce } from "solid-js/store";
import { parseNewProject } from "~/_function/parse/parse";
import { formError } from "~/_repository/state/error";
import { getNewProject, setNewProject } from "~/_repository/state/form";
import { isEdit, setIsEdit } from "~/_repository/state/view-state";
import { PersonalLevel, Status } from "~/_type/type";
import { setData } from "~/_usecase/control-data";
import { test } from "~/test/test";

const ProjectForm: Component<{index?: number}> = () => {

    window.addEventListener('DOMContentLoaded', () => {
        const elm = document.getElementById('project-about')
        if (elm !== null) elm.setAttribute('style', `height: ${elm.scrollHeight}px;`)
    })
    const textAreaHeight = (elm: HTMLTextAreaElement) => {
        elm.style.height = 'auto'
        elm.style.height = `${elm.scrollHeight}px`
    }

    const statusList: Status[] = ['not started', 'working', 'complete']

    return(
        <div>
            <button type="button" onClick={() => setIsEdit({show: false})}>x</button>
            <Show when={isEdit.new}>
                <button onClick={() => test.testSaveNew.project()}>新規追加</button>
            </Show>
            <Show when={formError.status}>
                <p>{formError.string}</p>
            </Show>
            <section>
                <label for="name">プロジェクト名</label>
                <input 
                    type="text" 
                    id="name" 
                    value={getNewProject.name} 
                    onChange={(e) => test.testChange.project('name', e.currentTarget.value)}
                />
            </section>
            <section>
                <label for="status">status: {getNewProject.status}</label>
                <input type="range" id="status" min={0} max={2} step={1} value={statusList.indexOf(getNewProject.status)}
                onInput={(e) => test.testChange.project('status', statusList[parseInt(e.currentTarget.value)])}
                onChange={(e) => test.testChange.project('status', statusList[parseInt(e.currentTarget.value)])}
                />
            </section>
            <section>
                <label for="importance">重要度</label>
                <input type="range" id="importance" min={1} max={5} step={1} value={getNewProject.importance} 
                onInput={(e) => test.testChange.project('importance', parseInt(e.currentTarget.value) as PersonalLevel)} 
                onChange={(e) => test.testChange.project('importance', parseInt(e.currentTarget.value) as PersonalLevel)}
                />
            </section>
            <section>
                <label for="urgency">緊急度</label>
                <input type="range" id="urgency" min={1} max={5} step={1} value={getNewProject.urgency} 
                onInput={(e) => test.testChange.project('urgency', parseInt(e.currentTarget.value) as PersonalLevel)} 
                onChange={(e) => test.testChange.project('urgency', parseInt(e.currentTarget.value) as PersonalLevel)}
                />
            </section>
            <section>
                <label for="project-about">about</label>
                <textarea name="about" id="project-about"
                onInput={(e) => {
                    textAreaHeight(e.currentTarget)
                    test.testChange.project('about', e.currentTarget.value)
                }}
                >{getNewProject.about ?? ''}</textarea>
            </section>
        </div>
    )
}
export default ProjectForm