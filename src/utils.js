export const randomSecuence = (num = 1) => {
  const list = []
  let cont = 0
  let randomNum = 0
  while (cont < num) {
    randomNum = Math.floor(Math.random() * num)
    if (!list.some(l => l == randomNum)) {
      list.push(randomNum)
      cont++
    }
  }
  return list
}
