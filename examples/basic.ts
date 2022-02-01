import suite from '../src'
import assert from 'assert'

const test = suite('my test suite')

test('trivial assert', () => {
  assert.equal(1 + 1, 2)
})

test('async test', async () => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  assert.equal(1 + 1, 2)
})

test('failing test', () => {
  assert.equal(1 + 1, 3)
})

!(() => test.run())()
