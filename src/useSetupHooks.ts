import { useEffect, DependencyList } from "react";

type CleanupCallback = () => void
type CleanupSetter = (cleanupCallback: CleanupCallback) => void
type SetupCallback = (cleanupSetter: CleanupSetter) => void

export function useSetup(setupCallback: SetupCallback) {

  let _cleanup: { callback?: CleanupCallback } = {}
  let _depList: { list?: DependencyList } = { list: [] }

  const setCleanup: CleanupSetter = (cleanup: CleanupCallback) => {
    _cleanup.callback = cleanup
  }

  const execute = () => {
    useEffect(() => {
      setupCallback(setCleanup)
      return _cleanup.callback
    }, _depList.list)  
  }

  return {
    once() {
      _depList.list = []
      execute()
    },
    resync(list: DependencyList) {
      _depList.list = list
      execute()
    },
    resyncOnEachRender() {
      _depList.list = undefined
      execute()
    }
  }
}
