import { createStore } from "solid-js/store"
import { ErrorState } from "~/_type/type"

const getDbErrorState: ErrorState = {status: false, string: 'アクセスを許可するか再読み込みしてください。'}
export const [initialError, setInitialError] = createStore(getDbErrorState)