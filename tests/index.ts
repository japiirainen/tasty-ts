import suite from '../src/index'
import assert from 'assert'
import getCounter from './counter'

const test = suite('my test suite')

const beforeAllCounter = getCounter()
const afterAllCounter = getCounter()
const beforeEachCounter = getCounter()
const afterEachCounter = getCounter()

test.afterAll(afterAllCounter.inc)
test.beforeAll(beforeAllCounter.inc)
test.beforeEach(beforeEachCounter.inc)
test.afterEach(afterEachCounter.inc)

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
    assert.equal(beforeAllCounter.get(), 1)
    assert.equal(afterAllCounter.get(), 1)
    assert.equal(beforeEachCounter.get(), 3)
    assert.equal(afterEachCounter.get(), 3)
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    process.exit(0)
  }
})()
