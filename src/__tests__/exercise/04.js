// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData = ''
  const handleSubmit = data => (submittedData = data)
  render(<Login onSubmit={handleSubmit} />)
  const username = 'mengano'
  const password = '123456'

  const usernameField = screen.getByRole('textbox', {
    name: /username/i,
  })
  const passwordField = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {
    name: /submit/i,
  })

  userEvent.type(usernameField, username)
  userEvent.type(passwordField, password)
  userEvent.click(submitButton)
  expect(submittedData).toEqual({username, password})
})

/*
eslint
  no-unused-vars: "off",
*/
