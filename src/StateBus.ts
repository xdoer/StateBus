import React, { useState, useEffect } from 'react'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export class StateBus<T = any> {

  constructor(private state?: T | (() => T)) { }

  private listeners: Dispatch<T>[] = []

  private subscribe(listener: Dispatch<T>) {
    this.listeners.push(listener)
  }

  private unsubscribe(listener: Dispatch<T>) {
    const idx = this.listeners.findIndex(fn => fn === listener)
    if (idx !== -1) this.listeners.splice(idx, 1)
  }

  getState(): T {
    if (typeof this.state === 'function') return (this.state as any)()

    return this.state as T
  }

  setState(data: T | ((prevState: T) => T)) {
    if (typeof data === 'function') {
      this.listeners.forEach(listener => listener((prev: T) => this.state = (data as any)(prev)))
    } else {
      this.listeners.forEach(listener => listener(data))
    }
  }

  useState() {
    const [data, setData] = useState<T>(this.state)

    useEffect(() => {
      this.subscribe(setData)

      return () => {
        this.unsubscribe(setData)

        if (!this.listeners.length) {
          this.state = null
        }
      }
    }, [])

    return [data, this.setState.bind(this)] as [T, Dispatch<T>]
  }
}
