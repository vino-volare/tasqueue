import { Component, For, Show } from "solid-js"
import { errorFlag } from "~/_repository/state/error"

const ErrorView: Component = () => {
    const flagDisjunction = errorFlag.map(data => data.status).reduce((previous, current) => previous || current, false)
    const existError = errorFlag.filter(data => data.status === true)
    return (
        <Show when={flagDisjunction}>
            <h1>
                Error
            </h1>
            <For each={existError}>
                {
                (err) => 
                <div>
                    {err.string}
                </div>
                }
            </For>
        </Show>
    )
}
export default ErrorView