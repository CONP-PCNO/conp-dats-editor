import { defaultDatsValidationSchema as datsValidationSchema, defaultDatsValues, doiRegex } from '../../model/datsSpec'
import { normalizeIdentifier } from '../../model/formToDats'
import { genDefaultReadme } from '../../components/forms/ReadmeEditor/ReadmeEditor'
import { errorMessages, fieldLabel, plainMessage } from '../../components/DatsErrors/DatsErrors'

const validPublication = (identifier) => ({
  title: 'A paper',
  authors: [{ fullName: 'A B', firstName: 'A', lastName: 'B' }],
  identifier: { identifier, identifierSource: '' }
})

describe('publication identifiers', () => {
  test.each([
    'https://doi.org/10.1016/j.dib.2020.105224',
    'http://dx.doi.org/10.14283/jpad.2016.121',
    'doi:10.1016/j.dib.2020.105224',
    '10.1016/j.dib.2020.105224',
    'https://n2t.net/ark:/70798/d78m93q8n7w4g20mhj',
    'https://elifesciences.org/articles/49630',
    ''
  ])('accepts %s', async (identifier) => {
    const schema = datsValidationSchema.fields.primaryPublications.innerType
    await expect(schema.validate(validPublication(identifier))).resolves.toBeTruthy()
  })

  test('an author with a full name only is enough', async () => {
    const schema = datsValidationSchema.fields.primaryPublications.innerType
    const pub = { ...validPublication(''), authors: [{ fullName: 'Judes Poirier', lastName: 'Poirier' }] }
    await expect(schema.validate(pub)).resolves.toBeTruthy()
  })

  test('rejects text that is no identifier', async () => {
    const schema = datsValidationSchema.fields.primaryPublications.innerType
    await expect(schema.validate(validPublication('see the paper'))).rejects.toBeTruthy()
  })

  test('DOIs are written as https://doi.org/...', () => {
    expect(normalizeIdentifier('http://dx.doi.org/10.14283/jpad.2016.121')).toBe('https://doi.org/10.14283/jpad.2016.121')
    expect(normalizeIdentifier('doi:10.1016/j.x.1')).toBe('https://doi.org/10.1016/j.x.1')
    expect(normalizeIdentifier('10.5281/zenodo.3991997')).toBe('https://doi.org/10.5281/zenodo.3991997')
    expect(normalizeIdentifier('https://elifesciences.org/articles/49630')).toBe('https://elifesciences.org/articles/49630')
    expect(doiRegex.test('https://elifesciences.org/articles/49630')).toBe(false)
  })
})

describe('publication dates', () => {
  test('an empty date row is left out, and no description key is written', () => {
    const FormToDats = require('../../model/formToDats').default
    const data = JSON.parse(JSON.stringify({ ...defaultDatsValues, title: 'T', isExperiment: false,
      primaryPublications: [{ ...validPublication('10.5281/zenodo.3991997'), dates: [{ date: '', description: '' }] }] }))
    const json = new FormToDats(data).getJson()
    expect(json.primaryPublications[0].dates).toEqual([])
    expect(json.primaryPublications[0].identifier.identifier).toBe('https://doi.org/10.5281/zenodo.3991997')
  })
})

describe('ethics statement', () => {
  const reb = datsValidationSchema.fields.reb_info
  test('required for an open dataset', async () => {
    await expect(datsValidationSchema.validateAt('reb_info', { privacy: 'open', isExperiment: false, reb_info: '' })).rejects.toBeTruthy()
  })
  test('not required for an experiment', async () => {
    await expect(datsValidationSchema.validateAt('reb_info', { privacy: 'open', isExperiment: true, reb_info: '' })).resolves.toBe('')
  })
  test('not required for registered data', async () => {
    await expect(datsValidationSchema.validateAt('reb_info', { privacy: 'registered', isExperiment: false, reb_info: '' })).resolves.toBe('')
  })
  expect(reb).toBeTruthy()
})

describe('README template', () => {
  const values = {
    ...defaultDatsValues,
    title: 'My dataset',
    description: 'What it is.',
    privacy: 'open',
    subjects: { applicable: true, value: '12' },
    formats: ['NIfTI'],
    licenses: ['CC BY'],
    isAbout: [{ name: 'Homo sapiens' }]
  }
  test('a dataset gets the dataset template', () => {
    const readme = genDefaultReadme({ ...values, isExperiment: false })
    expect(readme).toContain('## How the data were collected')
    expect(readme).toContain('* Subjects: 12')
    expect(readme).not.toContain('Experiment DOI')
    expect(readme).not.toContain('## Scoring')
  })
  test('an experiment keeps the experiment template', () => {
    const readme = genDefaultReadme({ ...values, isExperiment: true })
    expect(readme).toContain('Experiment DOI')
  })
})

describe('error messages in plain words', () => {
  test('field names as the form shows them', () => {
    expect(fieldLabel('files', false)).toBe('Number of files')
    expect(fieldLabel('reb_info', false)).toBe('Ethics statement')
    expect(fieldLabel('title', false)).toBe('Title')
  })
  test('no internal paths', () => {
    expect(plainMessage('size.value is a required field')).toBe('This is required.')
    expect(errorMessages({ value: 'size.value is a required field' })).toEqual(['This is required.'])
    expect(errorMessages([undefined, { name: 'creators[1].name is a required field' }])).toEqual(['item 2 › This is required.'])
  })
})

describe('round trip of a loaded record', () => {
  test('fields the form does not edit are written back, empty properties dropped', () => {
    const DatsToForm = require('../../model/datsToForm').default
    const FormToDats = require('../../model/formToDats').default
    const record = {
      title: 'PREVENT-AD open data', description: 'd', version: '2.0', privacy: 'open',
      creators: [{ name: 'StoP-AD Center' }], types: [{ information: { value: 'MRI', valueIRI: 'http://uri.interlex.org/ilx_0779748' } }],
      licenses: [{ name: 'CC BY', identifier: { identifier: 'https://creativecommons.org/licenses/by/4.0/' } }], keywords: [{ value: 'x' }],
      dates: [{ date: '2019-04-30', type: { value: 'release date' } }],
      distributions: [{ formats: ['MINC'], size: 223, unit: { value: 'GB' }, access: { landingPage: 'https://x.org', authorizations: [{ value: 'public' }] }, storedIn: { name: 'https://openpreventad.loris.ca' } }],
      availability: 'available', storedIn: { name: 'https://openpreventad.loris.ca/' },
      extraProperties: [
        { category: 'files', values: [{ value: '10' }] },
        { category: 'Timepoint description', values: [{ value: 'EL=eligibility' }] }
      ]
    }
    const form = new DatsToForm(JSON.parse(JSON.stringify(record))).getJson()
    const out = new FormToDats({ ...defaultDatsValues, ...form, isExperiment: false }).getJson()
    expect(out.availability).toBe('available')
    expect(out.storedIn).toEqual({ name: 'https://openpreventad.loris.ca/' })
    expect(out.extraProperties.find((p) => p.category === 'Timepoint description')).toBeTruthy()
    expect(out.extraProperties.every((p) => p.values.some((v) => v.value !== '' && !(Array.isArray(v.value) && !v.value.length)))).toBe(true)
    expect(out._preserved).toBeUndefined()
    expect(out.types[0].information.valueIRI).toBe('http://uri.interlex.org/ilx_0779748')
    expect(out.licenses[0].identifier.identifier).toBe('https://creativecommons.org/licenses/by/4.0/')
    expect(out.distributions[0].storedIn).toEqual({ name: 'https://openpreventad.loris.ca' })
    expect(out.dates[0].date.startsWith('2019-04-30')).toBe(true)   // not the 29th
  })
})
