import champions from './champions.json'
export const getRandomChampions = (numbers = 1) => {
  const list = []
  const len = champions.length
  let cont = 0
  let randomNum = 0
  while (cont < numbers) {
    randomNum = Math.floor(Math.random() * len)
    if (!list.some(l => l.id == champions[randomNum].id)) {
      list.push(champions[randomNum])
      cont++
    }
  }
  return list
}