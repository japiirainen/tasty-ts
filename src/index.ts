import { grayLn, gray, greenLn, redLn, yellow, cyan } from './colorLog'

type TestFn = (() => void) | (() => Promise<void>)

type Test = {
  name: string
  fn: TestFn
}

export default function (headline: string) {
  const suite: Test[] = []
  const beforeAll: TestFn[] = []
  const afterAll: TestFn[] = []
  const beforeEach: TestFn[] = []
  const afterEach: TestFn[] = []
  const only: Test[] = []

  const test = (name: string, fn: TestFn) => suite.push({ name: name, fn: fn })

  test.only = (name: string, fn: TestFn) => only.push({ name: name, fn: fn })
  test.beforeAll = (fn: TestFn) => beforeAll.push(fn)
  test.afterAll = (fn: TestFn) => afterAll.push(fn)
  test.beforeEach = (fn: TestFn) => beforeEach.push(fn)
  test.afterEach = (fn: TestFn) => afterEach.push(fn)
  test.skip = function (_: TestFn) {}

  test.run = async () => {
    const tests = only[0] ? only : suite

    cyan(headline + ' ')

    for (const fn of beforeAll) await fn()

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
      } finally {
        for (const fn of afterEach) await fn()
      }
    }

    for (const fn of afterAll) await fn()
    greenLn(`✓ ${tests.length} passed tests`)
    console.info('\n')
    return true
  }

  return test
}

const prettyError = (e: unknown) => {
  if (e instanceof Error) return yellow(e.stack ?? '')
  if (typeof e === 'string') {
    const i = e.indexOf('\n')
    yellow(e.slice(0, i))
    grayLn(e.slice(i))
  }
}
