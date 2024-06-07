import { useEffect, useState } from 'react'
import Game from './Game.jsx'
import { getRandomChampions, loadImgs } from './championList.js'

export function App() {
  const [cardsCount, setCount] = useState(0)
  const [score, setScore] = useState(0)
  const [cards, setCards] = useState(4)
  const [level, setlevel] = useState(1)
  const [champList, setList] = useState(getRandomChampions(cards))
  const [imgLoad, setLoaded] = useState(true)
  useEffect(() => {
    charge()
    async function charge() {
      setLoaded(await loadImgs(champList))
    }
    return () => {
      setLoaded(false)
    }
  }, [champList])

  function modifyScore(action) {
    if (action) {
      if (cardsCount + 1 == cards) {
        const newLevel = cards + 2
        setCount(0)
        setlevel(level + 1)
        setCards(newLevel)
        setList(getRandomChampions(newLevel))
        console.log(newLevel)
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
      <header><span>Level: {level}</span><span>Score: {score}</span><span>Champions: {cardsCount}/{cards}</span></header>
      {imgLoad && <Game modifyScore={modifyScore} setCount={setCount} champList={champList} />}
      {cardsCount == 0 &&<footer>Pick all champions without repeat</footer>}
    </>
  )
}

export default App
