import { StateBus } from './StateBus'
import { StateBusManager } from './StateBusManager'

const sbm = new StateBusManager()

export const initStore = <T>(key: string, init?: T | (() => T)) => {
  sbm.init(key, init)
}

export const useStore = <T>(key: string, init?: T | (() => T)) => {
  return sbm.init<T>(key, init).useState()
}

export const getStore = <T>(key: string) => {
  return sbm.init<T>(key).getState()
}

export const setStore = <T>(key: string, data: T | ((prev: T) => T)) => {
  return sbm.init<T>(key).setState(data)
}

export function createShareHook<N extends (s: StateBus<T>, ...v: any) => any, T>(cb: N, init?: T): (...a: Parameters<N> extends [v: any, ...b: infer B] ? B : never) => ReturnType<N> {
  const state = new StateBus<T>(init)
  return (...rest) => cb(state, ...rest)
}
