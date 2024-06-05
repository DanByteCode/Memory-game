import { useState } from 'react'
import Game from './Game.jsx'
export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>MEMORY GAME</header>
      <Game count={count} setCount={setCount}/>
      <footer>Score: {count}</footer>
    </>
  )
}

export default App
