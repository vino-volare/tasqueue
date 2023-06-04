import { Component, Match, Switch } from "solid-js";
import { isViewTask, setIsEdit, setIsViewTask } from "~/_repository/state/view-state";
import { test } from "~/test/test";

const TabBar: Component = () => {
    return(
        <nav>
            <button onClick={() => test.testShow.new()}>
                new
            </button>

            <button onClick={() => setIsViewTask(!isViewTask())}>
                <Switch fallback={<div>not found</div>}>
                    <Match when={isViewTask()}>
                        <div>
                            タスク一覧
                        </div>
                    </Match>
                    <Match when={!isViewTask()}>
                        <div>
                            プロジェクト一覧
                        </div>
                    </Match>
                </Switch>
            </button>
        </nav>
    )
}
export default TabBar