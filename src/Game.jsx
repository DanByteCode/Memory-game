import { getRandomChampions } from "./championList"
import { randomSecuence } from "./utils"
import { useState } from "react"
const size = 10
const champList = getRandomChampions(size)
let marked = []
export default function Game({ count, setCount }) {
  const [list, setList] = useState(champList)
  function playState(e, info) {
    e.preventDefault()
    if (comprobate(info)) {
      setCount(0)
      marked = []
    } else {
      const newList = randomSecuence(size).map((v) => list[v])
      marked.push(info)
      setCount(count + 1)
      setList(newList)
    }
  }
  function comprobate(info) {
    return marked.some(m => m == info)
  }
  return (
    <main>
      {list.map((data) => {
        return <div key={data.id} className="card" onClick={(e) => playState(e, data.id)}>
          <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.id}_0.jpg`}
            alt={data.name} title={`${data.name} ${data.title}`}
            width="300" />
          <span>{data.name}</span>
        </div>
      })}
    </main>)
}