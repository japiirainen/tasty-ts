export default () => {
  let count = 0
  return {
    dec() {
      count--
    },
    inc() {
      count++
    },
    get() {
      return count
    }
  }
}
