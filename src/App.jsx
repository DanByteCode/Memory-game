import { useEffect, useState } from 'react'
import Game from './Game.jsx'
import { getRandomChampions } from './championList.js'
import { useChampions } from './hooks/useChampions.js'

export function App() {
  const champions = useChampions()
  const [cardsCount, setCount] = useState(0)
  const [score, setScore] = useState(0)
  const [cards, setCards] = useState(4)
  const [level, setlevel] = useState(1)
  const [champList, setList] = useState(null)

  useEffect(() => {
    console.log(champions)
    if (champions != null) {
      const random = getRandomChampions(champions, cards)
      console.log(random)
      setList(random)
    }
  }, [champions, cards])

  function modifyScore(action) {
    if (action) {
      if (cardsCount + 1 == cards) {
        const newLevel = cards + 2
        setCount(0)
        setlevel(level + 1)
        setCards(newLevel)
      } else {
        setCount(cardsCount + 1)
      }
      setScore(score + 1)
    } else {
      setScore(score - cardsCount)
      setCount(0)
    }
  }
  return (
    <>
      <header>
        <span>Level: {level}</span>
        <span>Score: {score}</span>
        <span>
          Champions: {cardsCount}/{cards}
        </span>
      </header>
      {champList ? (
        <Game
          modifyScore={modifyScore}
          setCount={setCount}
          champList={champList}
          setList={setList}
        />
      ) : (
        false
      )}
      {cardsCount == 0 && <footer>Pick all champions without repeat</footer>}
    </>
  )
}

export default App
