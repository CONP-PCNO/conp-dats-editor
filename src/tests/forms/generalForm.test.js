import React from 'react'
import {
  screen,
  render,
  cleanup,
  waitFor,
  fireEvent
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { DatsCreatorGui } from '../..'
import { defaultSchema } from '../schemas/defaultSchema'

describe('General Form: field values and errors', () => {
  beforeEach(() => {
    render(<DatsCreatorGui validationSchema={defaultSchema} />)
  })
  afterEach(() => {
    cleanup()
  })
  it('title handles errors', async () => {
    const testId = 'title'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      expect(input).not.toBe(null)
    })

    fireEvent.blur(input)

    // const errorText = await waitFor(() =>
    //   screen.findByText('is a required field', { exact: false })
    // )

    // await waitFor(() => {
    //   expect(errorText).toBeInTheDocument()
    // })
  })
  it('title handles correct values', async () => {
    const testId = 'title'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Title'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Test Title')
    })
  })
  it('creators name handles errors', async () => {
    const testId = 'creators.0.name'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      expect(input).not.toBe(null)
    })

    fireEvent.blur(input)

    // const errorText = await waitFor(() =>
    //   screen.findByText('is a required field', { exact: false })
    // )

    // await waitFor(() => {
    //   expect(errorText).toBeInTheDocument()
    // })
  })
  it('creators name handles correct values', async () => {
    const testId = 'creators.0.name'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Name'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Test Name')
    })
  })
  it('creators email handles errors', async () => {
    const testId = 'creators.0.email'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      expect(input).not.toBe(null)
    })

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'T'
        }
      })
    })

    // const errorText = await waitFor(() => {
    //   screen.findByText('must be a valid email', { exact: false })
    // })

    // await waitFor(() => {
    //   expect(errorText).toBeInTheDocument()
    // })
  })
  it('creators email handles correct values', async () => {
    const testId = 'creators.0.email'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'test@email.com'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('test@email.com')
    })
  })
  it('creators role handles correct values', async () => {
    const testId = 'creators.0.role'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Principal Investigator'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Principal Investigator')
    })
  })
  it('description handles errors', async () => {
    const testId = 'description'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      expect(input).not.toBe(null)
    })

    fireEvent.blur(input)

    // const errorText = await waitFor(() =>
    //   screen.findByText('is a required field', { exact: false })
    // )

    // await waitFor(() => {
    //   expect(errorText).toBeInTheDocument()
    // })
  })
  it('description handles correct values', async () => {
    const testId = 'description'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Description'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Test Description')
    })
  })
  it('version handles errors', async () => {
    const testId = 'version'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      expect(input).not.toBe(null)
    })

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'string'
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
  it('version handles correct values', async () => {
    const testId = 'version'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: '1.0'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('1.0')
    })
  })
  it('licenses handles correct values', async () => {
    const testId = 'licenses.0.value'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'CC BY-SA'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('CC BY-SA')
    })
  })
  it('keywords handles correct values', async () => {
    const testId = 'keywords.0'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Keyword'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Test Keyword')
    })
  })
})
