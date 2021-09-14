import React from 'react'
import {
  screen,
  render,
  cleanup,
  waitFor,
  fireEvent
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { DatsEditorForm } from '../..'
import { defaultSchema } from '../schemas/defaultSchema'

describe('Extra Properties Form: field values and errors', () => {
  beforeEach(() => {
    render(<DatsEditorForm activeStep={2} validationSchema={defaultSchema} />)
  })
  afterEach(() => {
    cleanup()
  })
  it('Dimensions handles correct values', async () => {
    const addButton = await waitFor(() => screen.findByText('Add a Dimension'))

    fireEvent.click(addButton)
    const testId = 'dimensions.0.name'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Dimension'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Test Dimension')
    })
  })
  it('identifier.name handles correct values', async () => {
    const testId = 'identifier.identifier'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'https://doi.org/10.5281/zenodo.3991997'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('https://doi.org/10.5281/zenodo.3991997')
    })
  })
  it('identifier.source handles correct values', async () => {
    const testId = 'identifier.identifierSource'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Zenodo DOI'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Zenodo DOI')
    })
  })
  it('Contact->Name handles correct values', async () => {
    const testId = 'contact.name'
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
  it('Contact->Email handles correct values', async () => {
    const testId = 'contact.email'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'test@example.com'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('test@example.com')
    })
  })
  it('Logo->URL handles correct values', async () => {
    const testId = 'logo.url'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'www.example.com/logo'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('www.example.com/logo')
    })
  })
  it('Produced By handles correct values', async () => {
    const testId = 'producedBy'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Value'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Test Value')
    })
  })
  it('Is About handles correct values', async () => {
    const addButton = await waitFor(() =>
      screen.findByText('Add another Entity')
    )

    fireEvent.click(addButton)
    const testId = 'isAbout.0.name'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Value'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Test Value')
    })
  })
  it('Acknowledges handles correct values', async () => {
    const addButton = await waitFor(() =>
      screen.findByText('Add an Acknowledgement')
    )

    fireEvent.click(addButton)

    const testId = 'acknowledges.0.name'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Value'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Test Value')
    })
  })
  it('Spatial Coverage handles correct values', async () => {
    const addButton = await waitFor(() =>
      screen.findByText('Add a Spatial Coverage')
    )

    fireEvent.click(addButton)
    const testId = 'spatialCoverage.0.name'
    const input = await waitFor(() => screen.findByTestId(testId))

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Value'
        }
      })
    })

    await waitFor(() => {
      expect(input.value).toBe('Test Value')
    })
  })
})
