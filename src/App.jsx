import { useState } from 'react'
import './App.css'
import Calc from './components/Calc'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Calc></Calc>
    </>
  )
}

export default App
