// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {coords: {latitude: -32.4018106, longitude: -59.7833593}}

  const {promise, resolve} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(success =>
    promise.then(() => {
      success(fakePosition)
    }),
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(async () => {
    resolve()
    await promise
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    new RegExp(`${fakePosition.coords.latitude}`, 'i'),
  )

  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    new RegExp(`${fakePosition.coords.longitude}`, 'i'),
  )
})

test('failed location display error message', async () => {
  const errorMessage = 'something went wrong!'

  const {promise, reject} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (success, error) =>
      promise.catch(() => {
        error(new Error(errorMessage))
      }),
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(async () => {
    reject()
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})

/*
eslint
  no-unused-vars: "off",
*/
