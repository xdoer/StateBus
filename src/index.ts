import { StateBusManager } from './StateBusManager'
export { StateBus as default } from './StateBus'

const sbm = new StateBusManager()

export const initStore = <T>(key: string, init?: T) => {
  sbm.init(key, init)
}

export const useStore = <T>(key: string) => {
  return sbm.init<T>(key).useState()
}

export const getStore = <T>(key: string) => {
  return sbm.init<T>(key).getState()
}

export const setStore = <T>(key: string, data: T) => {
  return sbm.init<T>(key).setState(data)
}
