import { grayLn, gray, greenLn, redLn, yellow, cyan } from './colorLog'

type TestFn = (() => void) | (() => Promise<void>)

type Test = {
  name: string
  fn: TestFn
}

export default function (headline: string) {
  const suite: Test[] = []
  const beforeEach: TestFn[] = []
  const afterAll: TestFn[] = []
  const only: Test[] = []

  function self(name: string, fn: TestFn) {
    suite.push({ name: name, fn: fn })
  }

  self.only = function (name: string, fn: TestFn) {
    only.push({ name: name, fn: fn })
  }

  self.beforeEach = function (fn: TestFn) {
    beforeEach.push(fn)
  }

  self.afterAll = function (fn: TestFn) {
    afterAll.push(fn)
  }

  self.skip = function (_: TestFn) {}

  self.run = async function () {
    const tests = only[0] ? only : suite

    cyan(headline + ' ')

    for (const test of tests) {
      try {
        for (const fn of beforeEach) await fn()
        await test.fn()
        gray('• ')
      } catch (e) {
        for (const fn of afterAll) await fn()
        redLn(`\n\n! ${test.name} \n\n`)
        prettyError(e)
        return false
      }
    }

    for (const fn of afterAll) await fn()
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
