export const createId = () => {
  //It can be changed by a third party library.
  return String(Math.random() * 10000)
}
