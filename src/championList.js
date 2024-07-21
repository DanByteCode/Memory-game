const URL_API = "https://ddragon.leagueoflegends.com/"
export function getRandomChampions (championList, numbers = 1) {
  if(!championList) return null
  const list = []
  const len = championList.length
  let cont = 0
  let randomNum = 0
  while (cont < numbers) {
    randomNum = Math.floor(Math.random() * len)
    if (!list.some(l => l.id == championList[randomNum].id)) {
      list.push(championList[randomNum])
      cont++
    }
  }
  console.log(list)
  preloadImgs(list)
  return list
}

async function preloadImgs (list) {
  const PREFIX = URL_API + "cdn/img/champion/loading/"
  const sources = []

  list.map(async (champ) => {
    const image = new Image()
    image.src = `${PREFIX}${champ.id}_0.jpg`
    sources.push(image)
  })
  return sources
}
