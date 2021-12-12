import React, { useState, useEffect } from 'react'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export class StateBus<T = any> {
  private stateStack = []

  constructor(private state: T | (() => T)) {
    this.stateStack.push(state)
  }

  private listeners: Dispatch<T>[] = []

  private subscribe(listener: Dispatch<T>) {
    this.listeners.push(listener)
  }

  private unsubscribe(listener: Dispatch<T>) {
    const idx = this.listeners.findIndex(fn => fn === listener)
    if (idx !== -1) this.listeners.splice(idx, 1)
  }

  getState(): T {
    if (typeof this.state !== 'function') return this.state

    this.state = this.stateStack.reduce((result, current) => typeof current === 'function' ? current(result) : current, undefined)

    return this.state as T
  }

  setState(data: T | ((prevState?: T) => T)) {
    this.listeners.forEach(listener => listener(data))

    this.stateStack.push(data)
    if (typeof data !== 'function') this.state = data
  }

  useState() {
    const [data, setData] = useState<T>(this.state)

    useEffect(() => {
      this.subscribe(setData)

      return () => {
        this.unsubscribe(setData)

        if (!this.listeners.length) this.stateStack = []
      }
    }, [])

    return [data, this.setState.bind(this)] as [T, Dispatch<T>]
  }
}
