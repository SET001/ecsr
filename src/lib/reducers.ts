import { Action } from './index'

type NumberKeys<T> = keyof { [K in keyof T]: T[K] extends number ? K : never }
type ArrayKeys<T> = keyof { [K in keyof T]: T[K] extends any[] ? K : never }

export const increment = <T extends {}>(field: NumberKeys<T>, value: number = 1) =>
  (state: T): T => ({
    ...state,
    [field]: state[field] as unknown as number + value,
  })


export const addFromPayload = <T>(to?: ArrayKeys<T>) =>
  (state: any, { payload }: Action<T>) => (to
    ? {
      ...state,
      [to]: [
        ...state[to],
        payload,
      ],
    }
    : { ...state, ...payload })
