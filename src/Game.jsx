import { AnimatePresence, motion } from 'framer-motion'
import { randomSecuence } from './utils'

const PREFIX = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/'
let marked = []

export default function Game({ modifyScore, champList, setList }) {
  function playState(e, info) {
    e.preventDefault()
    if (marked.some((m) => m == info)) {
      modifyScore(false)
      marked = []
      e.target.classList.add('fail')
      setTimeout(async () => {
        e.target.classList.remove('fail')
      }, 500)
    } else {
      modifyScore(true)
      const newList = randomSecuence(champList.length).map((v) => champList[v])
      marked.push(info)
      setList(newList)
    }
  }

  return (
    <main>
      <AnimatePresence mode="popLayout">
        {champList.map((data) => {
          return (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              layout
              layoutId={data.id}
              key={data.id}
              className="card"
              onClick={(e) => playState(e, data.id)}
            >
              <img
                src={`${PREFIX}${data.id}_0.jpg`}
                alt={data.name}
                title={`${data.name} ${data.title}`}
                width="300"
              />
              <span>{data.name}</span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </main>
  )
}
