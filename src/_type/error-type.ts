export const catchErrorType = (funcName: string) => (err: unknown) => {
  if (err instanceof Error) {
    return err
  } else {
    return new Error('something wrong from: ' + funcName + '()')
  }
}
export type Result<T, U> = {
  data: T
  error?: undefined
} | {
  data?: undefined
  error: U
}

export const Result = {
  data: <T>(data: T) => ({ data }),
  error: <U>(error: U) => ({error}),
}

const a = (arg: string | number): Result<string, Error> => {
  if (typeof arg === 'string') {
    return Result.data(arg)
  }
  return Result.error(new Error('error'))
}
const b = (): Result<string, Error> => {
  const { data, error } = a('str')
  if (data !== undefined) {
    return Result.data(data)
  }
  return Result.error(error)
}