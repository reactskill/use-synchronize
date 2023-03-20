import { useState, useRef } from 'react'
import { useSetup } from './useSetupHooks'
import './App.css'

interface Props {
  exit: () => void
}

function App({ exit }: Props) {
  const [count, setCount] = useState(0)
  const [timerCount, setTimerCount] = useState(0)
  const [countUp, setCountUp] = useState(true)
  const [score, setScore] = useState(0)

  const appRef = useRef(document.createElement("div"))

  const nextCount = (count: number) => countUp ? count + 1 : count - 1

  const setupTimer = () => {
    return setInterval(() => {
      setTimerCount(state => state + 1)
    }, 1000)
  }

  const blink = () => {
    appRef.current.style.opacity = '0.5'
    return setTimeout(() => {
      appRef.current.style.opacity = '1'
    }, 100)
  }

  useSetup(cleanup => {
    const intervalId = setupTimer()
    cleanup(() => { clearInterval(intervalId) })
  })

  useSetup(() => {
    if(count >= 9) {
      setCountUp(false)
    }
    if(count <= 0) {
      setCountUp(true)
    }
  }).resync([count])

  useSetup(() => {
    if(count === timerCount % 10) {
      if(timerCount !== 0) {
        setScore(state => state + 1)
      }
    }
  }).resync([count, timerCount])

  useSetup(cleanup => {
    const timeoutId = blink()
    cleanup(() => {
      clearTimeout(timeoutId)
    })
  }).resyncOnEachRender()

  const clickAddCount = () => {
    setCount(count => nextCount(count))
  }

  return (
    <div className="App" ref={appRef}>
      <p>Timer: {timerCount}</p>
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
