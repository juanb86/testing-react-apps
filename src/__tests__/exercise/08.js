// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
function Counter() {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <div>Counter: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<Counter />)

  const currentCount = screen.getByText(/counter/i)

  expect(currentCount).toHaveTextContent('0')

  userEvent.click(screen.getByRole('button', {name: /increment/i}))
  expect(currentCount).toHaveTextContent('1')

  userEvent.click(screen.getByRole('button', {name: /decrement/i}))
  expect(currentCount).toHaveTextContent('0')
  // 🐨 render the component
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
})

/* eslint no-unused-vars:0 */
