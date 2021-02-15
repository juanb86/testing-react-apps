// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {coords: {latitude: -32.4018106, longitude: -59.7833593}}

  let updateCurrentPosition
  const useMockCurrentPosition = () => {
    const [state,setState] = React.useState([])
    updateCurrentPosition = setState
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    updateCurrentPosition([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    new RegExp(`${fakePosition.coords.latitude}`, 'i'),
  )

  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    new RegExp(`${fakePosition.coords.longitude}`, 'i'),
  )
})

/*
eslint
  no-unused-vars: "off",
*/
