fetch('https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json')
      .then((result) => {
        result.json().then((res) => {
          const champions = res.data
          const list = []
          for (const champ in champions) {
            list.push({
              id: champ,
              name: champions[champ].name,
              title: champions[champ].title
            })
          }
          console.log(list);
        })
      })