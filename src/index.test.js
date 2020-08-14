import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { DatsCreatorGui } from '.'

describe('DatsCreatorGui', () => {
  it('is truthy', () => {
    expect(DatsCreatorGui).toBeTruthy()
  })
  it('submits correct values', async () => {
    const { container } = render(<DatsCreatorGui />)
    const title = container.querySelector('input[name="title"]')

    await waitFor(() => {
      fireEvent.change(title, {
        target: {
          value: 'mocktitle'
        }
      })
    })
  })
})
