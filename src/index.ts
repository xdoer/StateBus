import { StateBusManager } from './StateBusManager'
import { StateBus } from './StateBus'

export { StateBus, StateBusManager }
export default StateBus

const sbm = new StateBusManager()

export const initStore = <T>(key: string, init?: T) => {
  sbm.init(key, init)
}

export const useStore = <T>(key: string, init?: T) => {
  return sbm.init<T>(key, init).useState()
}

export const getStore = <T>(key: string) => {
  return sbm.init<T>(key).getState()
}

export const setStore = <T>(key: string, data: T | ((prev: T) => T)) => {
  return sbm.init<T>(key).setState(data)
}
