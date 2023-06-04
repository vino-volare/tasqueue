import { createStore } from "solid-js/store"

type ErrorPropName = 'getDbError' | 'dataMismatchError'
export type ErrorState = {
    name: ErrorPropName,
    status: boolean,
    string: string,
}

const errorStates: ErrorState[] = [
    {name: 'getDbError', status: false, string: 'アクセスを許可するか再読み込みしてください。'},
    {name: 'dataMismatchError', status: false, string:'データ不整合が起きたので巻き戻します。'},
]

const [errorFlag, setError] = createStore(errorStates)

type SetErrorFlag = (errorName: ErrorPropName, flag: boolean) => void
const setErrorFlag:SetErrorFlag = (errorName, flag) => {
    setError((err) => err.name === errorName, 'status', flag)
}

export {errorFlag, setErrorFlag}

type FormError = {status: boolean, string: string}
const form: FormError = {status: false, string: 'プロジェクトを選択してください'}
export const [formError, setFormError] = createStore(form)