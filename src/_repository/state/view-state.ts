import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { EditStatus } from "~/_type/type";

export const [isViewTask, setIsViewTask] = createSignal(true)

const editStatus: EditStatus = {isTask: true, show: false, new: true}
export const [isEdit, setIsEdit] = createStore(editStatus)