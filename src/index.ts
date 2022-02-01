import {grayLn, gray, greenLn, magenta, redLn, yellow} from './colorLog'

type TestFn = () => void | (() => Promise<void>)

type Test = {
  name: string
  fn: TestFn
}

export default function (headline: string) {
  const suite: Test[] = []
  const before: TestFn[] = []
  const after: TestFn[] = []
  const only: Test[] = []

  function self(name: string, fn: () => void) {
    suite.push({name: name, fn: fn})
  }

  self.only = function (name: string, fn: TestFn) {
    only.push({name: name, fn: fn})
  }

  self.before = function (fn: TestFn) {
    before.push(fn)
  }
  self.after = function (fn: TestFn) {
    after.push(fn)
  }
  self.skip = function (_: TestFn) {}

  self.run = async function () {
    const tests = only[0] ? only : suite

    magenta(headline + ' ')

    for (const test of tests) {
      try {
        for (const fn of before) await fn()
        await test.fn()
        gray('• ')
      } catch (e) {
        for (const fn of after) await fn()
        redLn(`\n\n! ${test.name} \n\n`)
        prettyError(e)
        return false
      }
    }

    for (const fn of after) await fn()
    greenLn(`✓ ${tests.length} passed tests`)
    console.info('\n')
    return true
  }

  return self
}

const prettyError = (e: unknown) => {
  if (e instanceof Error) return yellow(e.stack ?? '')
  if (typeof e === 'string') {
    const i = e.indexOf('\n')
    yellow(e.slice(0, i))
    grayLn(e.slice(i))
  }
}
