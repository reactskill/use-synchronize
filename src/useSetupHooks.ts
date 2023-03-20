import { useEffect, DependencyList } from "react";

type CleanupCallback = () => void
type CleanupSetter = (cleanupCallback: CleanupCallback) => void
type SetupCallback = (cleanupSetter: CleanupSetter) => void
type WatchList = DependencyList

function _useSetup(setupCallback: SetupCallback, list?: WatchList) {

  let _cleanup: CleanupCallback

  const setCleanup: CleanupSetter = (cleanup: CleanupCallback) => {
    _cleanup = cleanup
  }

  useEffect(() => {
    setupCallback(setCleanup)
    return _cleanup
  }, list)
}

export function useSetup(setupCallback: SetupCallback) {
  _useSetup(setupCallback, [])
}

export function useSetupResync(list: WatchList, setupCallback: SetupCallback) {
  _useSetup(setupCallback, list)
}

export function useSetupResyncEachRender(setupCallback: SetupCallback) {
  _useSetup(setupCallback)
}
