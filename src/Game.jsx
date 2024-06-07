import { randomSecuence } from "./utils"
import { useState } from "react"

const PREFIX = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/"
let marked = []

export default function Game({ modifyScore, champList }) {
  const [list, setList] = useState(champList)
  function playState(e, info) {
    e.preventDefault()
    if (marked.some(m => m == info)) {
      modifyScore(false)
      marked = []
      e.target.classList.add("fail")
      setTimeout(async () => { e.target.classList.remove("fail") }, 500)
    } else {
      modifyScore(true)
      const newList = randomSecuence(champList.length).map((v) => list[v])
      marked.push(info)
      setList(newList)
    }
  }

  return (
    <main>
      {list.map((data) => {
        return <div key={data.id} className="card" onClick={(e) => playState(e, data.id)}>
          <img src={`${PREFIX}${data.id}_0.jpg`}
            alt={data.name} title={`${data.name} ${data.title}`}
            width="300" />
          <span>{data.name}</span>
        </div>
      })}
    </main>)
}