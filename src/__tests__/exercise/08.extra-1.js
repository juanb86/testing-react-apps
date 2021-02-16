// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup(...args) {
  const returnVal = {}
  function TestComponent() {
    Object.assign(returnVal, useCounter(...args))
    return null
  }
  render(<TestComponent />)
  return returnVal
}

test('exposes the count and increment/decrement functions', () => {
  const counter = setup()

  expect(counter.count).toEqual(0)

  act(() => {
    counter.increment()
    counter.increment()
  })
  expect(counter.count).toEqual(2)

  act(() => {
    counter.decrement()
  })
  expect(counter.count).toEqual(1)
})

test('allows customization of the initial count', () => {
  const counter = setup({initialCount: 2})

  expect(counter.count).toEqual(2)

  act(() => {
    counter.increment()
    counter.increment()
  })
  expect(counter.count).toEqual(4)

  act(() => {
    counter.decrement()
  })
  expect(counter.count).toEqual(3)
})

test('allows customization of the step', () => {
  const counter = setup({step: 3})

  expect(counter.count).toEqual(0)

  act(() => {
    counter.increment()
    counter.increment()
  })
  expect(counter.count).toEqual(6)

  act(() => {
    counter.decrement()
  })
  expect(counter.count).toEqual(3)
})
/* eslint no-unused-vars:0 */
