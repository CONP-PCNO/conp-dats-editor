import React from 'react'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import { DatsCreatorGui } from '..'

describe('DatsCreatorGui', () => {
  it('submits correct values', async () => {
    const testId = 'title'
    render(<DatsCreatorGui />)
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'mocktitle'
        }
      })
    })

    await waitFor(() => {
      expect(input).not.toBe(null)
    })

    await waitFor(() => {
      expect(input.value).toBe('mocktitle')
    })
  })
})
