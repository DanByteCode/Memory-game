import champions from './champions.json'
const URL_API = "https://ddragon.leagueoflegends.com/"
const championList = await fetchChampions()

export const getRandomChampions = (numbers = 1) => {
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
  return list
}

export async function loadImgs(list) {
  const PREFIX = URL_API + "cdn/img/champion/loading/"
  const promises = [];
  for (const element of list) {
    const image = new Image();
    promises.push(new Promise((resolve, reject) => {
      image.src = `${PREFIX}${element.id}_0.jpg`;
      image.onload = () => resolve();
      image.onerror = () => reject();
    }));
  }
  await Promise.all(promises);
  return true
}
export async function fetchChampions() {
  try {
    const resVersion = await fetch(URL_API + "realms/na.json")
    const version = await resVersion.json()
    const resChampion = await fetch(`${URL_API}cdn/${version.v}/data/en_US/champion.json`)
    const result = await resChampion.json()
    const champions = result.data
    const list = []
    for (const champ in champions) {
      list.push({
        id: champ,
        name: champions[champ].name,
        title: champions[champ].title
      })
    }
    return list
  } catch (e) {
    return champions
  }
}