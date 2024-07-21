import { useEffect, useState } from 'react'
import defaultList from '../champions.json'

const URL_API = "https://ddragon.leagueoflegends.com/"

export function useChampions () {
  const [champions, setChampions] = useState(null)

  useEffect(() => {
    getChampions()
    async function getChampions () {
      try {
       setChampions(await fetchChampions())
      } catch (err) {
        setChampions(defaultList)
      }

    }
  }, [])
  return champions
}

async function fetchChampions () {
  try {
    const resVersion = await fetch(URL_API + "realms/na.json")
    const version = await resVersion.json()
    const resChampion = await fetch(`${URL_API}cdn/${version.v}/data/en_US/champion.json`)
    const result = await resChampion.json()
    const list = Object.entries(result.data)
    return list.map((champ) => {
      return {
        id: champ[0],
        name: champ[1].name,
        title: champ[1].title
      }
    })
  } catch (e) {
    return defaultList
  }
}