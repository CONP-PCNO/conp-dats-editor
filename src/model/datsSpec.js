import * as yup from 'yup'

const defaultDatsValidationSchema = yup.object({
  title: yup.string().required(),
  creators: yup.array().of(
    yup.object({
      name: yup.string(),
      email: yup.string().email(),
      orcid: yup.string().when('type', {
        // eslint-disable-next-line eqeqeq
        is: (type) => type === 'Person',
        then: yup
          .string()
          .matches(
            /^https:\/\/orcid.org\/\d\d\d\d-\d\d\d\d-\d\d\d\d-\d\d\d[\dX]$/u
          )
          .required(
            'An ORCID (https://orcid.org/XXXX-XXXX-XXXX-XXXX) is required'
          ),
        otherwise: yup.string()
      })
    })
  ),
  contact: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required()
  }),
  description: yup.string().required(),
  types: yup.array().of(yup.string()).min(1).required(),
  version: yup.number().positive(),
  licenses: yup.array().of(yup.string()).min(1),
  keywords: yup.array().of(yup.string()).min(1),
  formats: yup.array().of(yup.string()),
  size: yup
    .object({
      value: yup.number().positive().required(),
      units: yup.string().required()
    })
    .required(),
  access: yup
    .object({
      landingPage: yup.string().url().required(),
      authorization: yup.string().required()
    })
    .required(),
  privacy: yup
    .string()
    .matches(/(?:open|registered|controlled|private)/u, {
      excludeEmptyString: true
    })
    .required(),
  files: yup.number().integer().positive().required(),
  subjects: yup.object({
    applicable: yup.boolean(),
    value: yup.number().integer().positive()
  }),
  conpStatus: yup
    .string()
    .matches(/(?:CONP|Canadian|external)/u, {
      excludeEmptyString: true
    })
    .required(),
  derivedFrom: yup.string(),
  parentDatasetId: yup.string(),
  primaryPublications: yup.array().of(yup.string()),
  dimensions: yup.array().of(yup.string()),
  identifier: yup.object({
    name: yup.string(),
    source: yup.string().url()
  }),
  logo: yup.object({
    type: yup.string().oneOf(['url', 'fileName']),
    fileName: yup.string(),
    url: yup.string().url()
  }),
  dates: yup.array().of(
    yup.object({
      date: yup.date(),
      description: yup.string()
    })
  ),
  citations: yup.array().of(yup.string()),
  producedBy: yup.string(),
  isAbout: yup.array().of(yup.string()),
  hasPart: yup.string(),
  acknowledges: yup.string(),
  refinement: yup.string(),
  aggregation: yup.string(),
  spatialCoverage: yup.array().of(yup.string()),
  reb_info: yup
    .string()
    .oneOf(['option_1', 'option_2', 'option_3', 'option_4'])
    .required(),
  reb_number: yup.string(),
  experimentsFunctionAssessed: yup.array().of(yup.string()),
  experimentsLanguages: yup.array().of(yup.string()),
  experimentsValidationMeasures: yup
    .array()
    .of(yup.object({ value: yup.string(), valueOther: yup.string() })),
  experimentsValidationPopulations: yup
    .array()
    .of(yup.object({ value: yup.string(), valueOther: yup.string() })),
  experimentsAccessibility: yup
    .array()
    .of(yup.object({ value: yup.string(), valueOther: yup.string() })),
  experimentsSpecies: yup.array().of(yup.string()),
  experimentsModalities: yup.array().of(yup.string()),
  experimentsRequiredDevices: yup
    .array()
    .of(yup.object({ value: yup.string(), valueOther: yup.string() })),
  experimentsRequiredSoftware: yup.array().of(
    yup.object({
      software: yup.object({ value: yup.string(), valueOther: yup.string() }),
      version: yup.string()
    })
  ),
  experimentsStimuli: yup
    .array()
    .of(yup.object({ value: yup.string(), valueOther: yup.string() })),
  experimentsAdditionalRequirements: yup.string()
})

const defaultDatsValues = {
  title: '',
  creators: [
    {
      name: '',
      type: 'Organization',
      role: 'Principal Investigator',
      abbreviation: ''
    }
  ],
  contact: {
    name: '',
    email: ''
  },
  description: '',
  types: [],
  version: '',
  licenses: [
    {
      value: '',
      valueOther: ''
    }
  ],
  keywords: [],
  formats: [],
  size: {
    value: '',
    units: 'MB'
  },
  access: {
    landingPage: '',
    authorization: 'public'
  },
  privacy: '',
  files: '',
  subjects: { applicable: true, value: '' },
  conpStatus: '',
  origin: {
    institution: '',
    city: '',
    province: '',
    country: ''
  },
  derivedFrom: '',
  parentDatasetId: '',
  primaryPublications: [],
  dimensions: [],
  identifier: {
    identifier: '',
    identifierSource: ''
  },
  logo: {
    type: 'url',
    fileName: '',
    url: ''
  },
  dates: [],
  citations: [],
  producedBy: '',
  isAbout: [
    {
      type: 'Species'
    }
  ],
  hasPart: '',
  acknowledges: [],
  refinement: '',
  aggregation: '',
  spatialCoverage: [],
  attachments: [],
  reb_info: '',
  reb_number: '',
  experimentsFunctionAssessed: [],
  experimentsLanguages: [],
  experimentsValidationMeasures: [],
  experimentsValidationPopulations: [],
  experimentsAccessibility: [],
  experimentsSpecies: [],
  experimentsModalities: [],
  experimentsRequiredDevices: [],
  experimentsRequiredSoftware: [],
  experimentsStimuli: [],
  experimentsAdditionalRequirements: ''
}

export { defaultDatsValidationSchema, defaultDatsValues }
