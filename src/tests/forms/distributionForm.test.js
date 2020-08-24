import React from 'react'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { DatsCreatorGui } from '../..'
import { defaultSchema } from '../schemas/defaultSchema'

describe('Distribution Form: field values and errors', () => {
  beforeEach(() => {
    render(<DatsCreatorGui activeStep={1} validationSchema={defaultSchema} />)
  })
  it('formats handles correct values', async () => {
    const testId = 'formats.0'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Format'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Test Format')
    })
  })
  it('size handles errors', async () => {
    const testId = 'size.value'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      expect(input).not.toBe(null)
    })

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Size'
        }
      })
    })

    // const errorText = await waitFor(() =>
    //   screen.findByText('must be a `number` type', { exact: false })
    // )

    // await waitFor(() => {
    //   expect(errorText).toBeInTheDocument()
    // })
  })
  it('size handles correct values', async () => {
    const testId = 'size.value'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: '123.45'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('123.45')
    })
  })
  it('size unit handles correct values', async () => {
    const testId = 'size.units'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'mb'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('mb')
    })
  })
  it('Access->LandingPage handles correct values', async () => {
    const testId = 'access.landingPage'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'www.example.com'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('www.example.com')
    })
  })
  it('Access->Authorization handles correct values', async () => {
    const testId = 'access.authorization'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'public'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('public')
    })
  })
  it('Privacy handles correct values', async () => {
    const testId = 'privacy'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'public'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('public')
    })
  })
  it('Files handles correct values', async () => {
    const testId = 'files'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: '500'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('500')
    })
  })
  it('Subjects handles correct values', async () => {
    const testId = 'subjects'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: '1000'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('1000')
    })
  })
  it('CONP status handles correct values', async () => {
    const testId = 'conpStatus'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'conp'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('conp')
    })
  })
})
