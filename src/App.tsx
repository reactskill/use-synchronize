import { useState, useRef } from 'react'
import { useSetup } from './useSetup'
import './App.css'

interface Props {
  exit: () => void
}

function App({ exit }: Props) {
  const [count, setCount] = useState(0)
  const [timerCount, setTimerCount] = useState(0)
  const [countUp, setCountUp] = useState(true)
  const [score, setScore] = useState(0)

  if(true) {
    useState(1)
  }

  const appRef = useRef(document.createElement("div"))

  const nextCount = (count: number) => countUp ? count + 1 : count - 1

  const setupTimer = () => {
    return setInterval(() => {
      setTimerCount(state => state + 1)
    }, 1000)
  }

  useSetup(cleanup => {
    const intervalId = setupTimer()
    cleanup(() => { clearInterval(intervalId) })
  })

  useSetup([count], () => {
    if(count >= 9) {
      setCountUp(false)
    }
    if(count <= 0) {
      setCountUp(true)
    }
  })

  useSetup([count, timerCount], () => {
    if(count === timerCount % 10) {
      if(timerCount !== 0) {
        setScore(state => state + 1)
      }
    }
  })

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
