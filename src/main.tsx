import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const Wrapper = () => {
  const [visible, setVisible] = useState(true)
  return <div>
    {visible && (
      <App exit={() => setVisible(false)} />
    )}
    {!visible && (
      <button onClick={() => setVisible(true)}>Bring Back</button>
    )}
  </div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
)
