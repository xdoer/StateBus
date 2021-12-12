import React, { useState, useEffect } from 'react'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export class StateBus<T = any> {

  constructor(private state: T | (() => T)) { }

  private listeners: Dispatch<T>[] = []

  private subscribe(listener: Dispatch<T>) {
    this.listeners.push(listener)
  }

  private unsubscribe(listener: Dispatch<T>) {
    const idx = this.listeners.findIndex(fn => fn === listener)
    if (idx !== -1) this.listeners.splice(idx, 1)
  }

  getState() {
    return this.state
  }

  setState(data: T | ((prevState: T) => T)) {
    this.listeners.forEach(listener => listener(data))
  }

  useState() {
    const [data, setData] = useState<T>(this.state)

    if (this.state !== data) this.state = data

    useEffect(() => {
      this.subscribe(setData)

      return () => {
        this.unsubscribe(setData)
      }
    }, [])

    return [data, this.setState.bind(this)] as [T, Dispatch<T>]
  }
}
