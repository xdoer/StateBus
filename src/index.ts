import React, { useState, useEffect } from 'react'

export class StateBus<T> {

  public state: T

  constructor(public initialState: T | (() => T)) { }

  private listeners: React.Dispatch<React.SetStateAction<T>>[] = []

  private subscribe(listener: React.Dispatch<React.SetStateAction<T>>) {
    this.listeners.push(listener)
  }

  private unsubscribe(listener: React.Dispatch<React.SetStateAction<T>>) {
    const idx = this.listeners.findIndex(fn => fn === listener)
    if (idx !== -1) this.listeners.splice(idx, 1)
  }

  dispatch(data: T | ((prevState: T) => T)) {
    this.listeners.forEach(listener => listener(data))
  }

  useState() {
    const [data, setData] = useState<T>(this.initialState)

    if (this.state !== data) this.state = data

    useEffect(() => {
      this.subscribe(setData)

      return () => {
        this.unsubscribe(setData)
      }
    }, [])

    return [data, this.dispatch.bind(this)] as [T, React.Dispatch<React.SetStateAction<T>>]
  }
}
