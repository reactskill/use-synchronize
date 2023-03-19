import { useEffect } from "react";

export function useSetup(cb) {

  let _cleanup

  const setCleanup = (cleanup) => {
    _cleanup = cleanup
  }
  
  useEffect(() => {
    cb(setCleanup)
    return _cleanup 
  }, [])
}

export function useWatch(list, cb) {
  useEffect(cb, list)
}

export const useAfterEachRender = useEffect