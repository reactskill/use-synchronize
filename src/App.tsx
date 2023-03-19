import { useState, useRef } from 'react'
import { useSetup, useWatch, useAfterEachRender } from './useEffectHooks'
import './App.css'

interface Props {
  exit: () => void
}

function App({ exit }: Props) {
  const [count, setCount] = useState(0)
  const [autoCount, setAutoCount] = useState(0)
  const [countUp, setCountUp] = useState(true)
  const [score, setScore] = useState(0)

  const appRef = useRef(document.createElement("div"))
  const countTimerId = useRef<number | undefined>(undefined)

  const nextCount = (count: number) => countUp ? count + 1 : count - 1

  const setCountTimer = () => {
    countTimerId.current = setInterval(() => {
      setAutoCount(state => state + 1)
    }, 1000)
  }

  const clearCountTimer = () => {
    clearInterval(countTimerId.current)
    countTimerId.current = undefined
  }

  const blink = () => {
    appRef.current.style.opacity = '0.5'
    setTimeout(() => {
      appRef.current.style.opacity = '1'
    }, 100)
  }

  useSetup(cleanup => {
    setCountTimer()
    cleanup(() => { clearCountTimer() })
  })

  useWatch([count], () => {
    if(count >= 9) {
      setCountUp(false)
    }
    if(count <= 0) {
      setCountUp(true)
    }
  })

  useWatch([count, autoCount], () => {
    if(count === autoCount % 10) {
      if(autoCount !== 0) {
        setScore(state => state + 1)
      }
    }
  })

  useAfterEachRender(() => {
    blink()
  })

  const clickAddCount = () => {
    setCount(count => nextCount(count))
  }

  return (
    <div className="App" ref={appRef}>
      <p>Auto Count: {autoCount}</p>
      <p>Count: {count}</p>
      <p>
        <button onClick={() => clickAddCount()}>Add Count</button>
        <button onClick={exit}>exit</button>
      </p>
      <p>Score: {score}</p>
    </div>
  )
}

export default App
