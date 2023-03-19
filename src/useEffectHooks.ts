import { useEffect, EffectCallback, DependencyList } from "react";

type CleanupCallback = () => void
type CleanupSetter = (cleanupCallback: CleanupCallback) => void
type SetupCallback = (cleanupSetter: CleanupSetter) => void
type WatchList = DependencyList
type WatchCallback = EffectCallback

export function useSetup(setupCallback: SetupCallback) {

  let _cleanup: CleanupCallback

  const setCleanup: CleanupSetter = (cleanup: CleanupCallback) => {
    _cleanup = cleanup
  }

  useEffect(() => {
    setupCallback(setCleanup)
    return _cleanup
  }, [])
}

export function useWatch(list: WatchList, cb: WatchCallback) {
  useEffect(cb, list)
}

export const useAfterEachRender = (cb: EffectCallback) => {
  useEffect(cb)
}