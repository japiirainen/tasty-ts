*Tasty-ts* is a tasty testing library for typescript and javascript. It is extremely simple, fast and it "just works".

### Install

with yarn
```sh
yarn add -D tasty-ts
```

with npm
```sh
npm install --save-dev tasty-ts
```

### A simple example
```ts
import suite from 'tasty-ts'
import assert from 'assert'

const test = suite('my tasty test suite')

test('trivial-assert', () => {
    assert.equal(1 + 1, 2)
})

!(() => test.run())()
```


### Motivation
TODO
### Docs
TODO

### Acknowledgements, citations, and related work
The following is a non-exhaustive list of people and works that have had a significant impact, directly or indirectly, on tasty-ts’s design and implementation:

- Tero Piirainen and all [baretest](https://github.com/volument/baretest) contributors.
