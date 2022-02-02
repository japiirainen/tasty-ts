import suite from '../src/index'
import assert from 'assert'
import getCounter from './counter'

const test = suite('my test suite')

const counter = getCounter()

test.beforeEach(counter.inc)

test.skip(counter.inc)

test('trivial assert', () => {
  assert.equal(1 + 1, 2)
})

test('async test', async () => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  assert.equal(1 + 1, 2)
})

test('failing test', async () => {
  await assert.rejects(async () => {
    throw new Error('explosion!')
  })
})

!(async () => {
  try {
    await test.run()
    assert.equal(counter.get(), 3)
  } finally {
    process.exit(0)
  }
})()
