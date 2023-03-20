import { useEffect, DependencyList } from "react";

type CleanupCallback = () => void
type CleanupSetter = (cleanupCallback: CleanupCallback) => void
type SetupCallback = (cleanupSetter: CleanupSetter) => void

function on(list?: DependencyList) {

  let _depList: { list?: DependencyList } = { list: [] }

  _depList.list = list

  return {
    useSetup: function (setupCallback: SetupCallback) {

      let _cleanup: { callback?: CleanupCallback } = {}

      const setCleanup: CleanupSetter = (cleanup: CleanupCallback) => {
        _cleanup.callback = cleanup
      }

      const execute = () => {
        useEffect(() => {
          setupCallback(setCleanup)
          return _cleanup.callback
        }, _depList.list)  
      }

      execute()
    }
  }
}

export function onMount() {
  return on([])
}

export function onChange(list: DependencyList) {
  return on(list)
}

export function onRender() {
  return on()
}