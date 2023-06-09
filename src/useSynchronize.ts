import { useEffect, DependencyList, useCallback } from "react";

type CleanupCallback = () => void
type CleanupSetter = (cleanupCallback: CleanupCallback) => void
type SetupCallback = (cleanupSetter: CleanupSetter) => void

export function useSynchronize(callback: SetupCallback): void
export function useSynchronize(list: DependencyList, callback: SetupCallback): void
export function useSynchronize(listOrCallback: DependencyList | SetupCallback, callback?: SetupCallback | undefined) {

  let _depList: DependencyList | undefined
  let _cleanupCallback: CleanupCallback | undefined
  let _setupCallback: SetupCallback | undefined

  const setCleanup: CleanupSetter = (cleanup: CleanupCallback) => {
    _cleanupCallback = cleanup
  }

  if(typeof listOrCallback === 'function') {
    _setupCallback = listOrCallback
  }
  else {
    _depList = listOrCallback
    _setupCallback = callback
  }

  if(_setupCallback === undefined) return

  useEffect(() => {
    _setupCallback!(setCleanup)
    return _cleanupCallback
  }, _depList)
}

type CallbackRef<T> = (node: T | null) => void
type DOMSetup<T> = (node: T | null) => void

export function useSynchronizeDOM<T>(setup: DOMSetup<T>, list?: DependencyList): CallbackRef<T> {
  return useCallback((node: T | null) => {
    setup(node)
  }, list ? list : [])
}
