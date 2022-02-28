import { StateBus } from './StateBus'

interface ReturnCallBack<T, N extends CallBack<T>> {
  (...a: Parameters<N> extends [v: any, ...b: infer B] ? B : never): ReturnType<N>
  store: StateBus<T>
}

type CallBack<T> = (s: StateBus<T>, ...v: any) => any

export function createShareHook<N extends CallBack<T>, T>(cb: N, init?: T): ReturnCallBack<T, N> {
  const store = new StateBus<T>(init)

  const share = (...rest) => cb(store, ...rest)
  share.store = store

  return share
}
