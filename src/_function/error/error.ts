export type ShowMethod = (str: string) => void
type PushError = (pushStr: string) => (showMethod: ShowMethod) => void
export const pushError: PushError = (pushStr) => (showMethod) => {
    showMethod(pushStr)
}