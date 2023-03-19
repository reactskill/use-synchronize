import { useState, useRef } from 'react'
import { useSetup, useWatch, useAfterEachRender } from './useEffectHooks'
import './App.css'

function App({ exit }) {
  const [count, setCount] = useState(0)
  const [autoCount, setAutoCount] = useState(0)
  const [countUp, setCountUp] = useState(true)
  const appRef = useRef(null)

  const [score, setScore] = useState(0)

  const countTimerId = useRef(null)

  const nextCount = count => countUp ? count + 1 : count - 1

  const setCountTimer = () => {
    countTimerId.value = setInterval(() => {
      setAutoCount(state => state + 1)
    }, 1000)
  }

  const clearCountTimer = () => {
    clearInterval(countTimerId.value)
    countTimerId.value = null
  }

  const blink = () => {
    appRef.current.style.opacity = 0.5
    setTimeout(() => {
      appRef.current.style.opacity = 1
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
