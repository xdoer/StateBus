import { StateBus } from './StateBus'

export class StateBusManager {
  private stateBuses: { [key: string]: StateBus } = {}

  get<T>(key: string): StateBus<T> {
    return this.stateBuses[key]
  }

  set<T>(key: string, initData: T | ((prev?: T) => T)) {
    this.stateBuses[key] = new StateBus<T>(initData)
  }

  init<T>(key: string, initData?: T | (() => T)) {
    return this.get<T>(key) || this.set(key, initData) || this.get<T>(key)
  }
}
