import { StateBusManager } from './StateBusManager'

const sbm = new StateBusManager()

export const useStore = <T>(key: string, init?: T | (() => T)) => {
  return sbm.init<T>(key, init).useState()
}

export const getStore = <T>(key: string) => {
  return sbm.init<T>(key).getState()
}

export const setStore = <T>(key: string, data: T | ((prev: T) => T)) => {
  return sbm.init<T>(key).setState(data)
}
