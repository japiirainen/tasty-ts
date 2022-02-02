import suite from '../src/index'
import assert from 'assert'
import getCounter from './counter'

const test = suite('my test suite')

const beforeEachCounter = getCounter()
const afterAllCounter = getCounter()

test.beforeEach(beforeEachCounter.inc)
test.afterAll(afterAllCounter.inc)

test.skip(beforeEachCounter.inc)

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
    assert.equal(beforeEachCounter.get(), 3)
    assert.equal(afterAllCounter.get(), 1)
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    process.exit(0)
  }
})()
