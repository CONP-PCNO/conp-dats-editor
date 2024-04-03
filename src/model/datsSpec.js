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
    value: yup.number().integer().positive().nullable()
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
    identifier: yup.string().url(),
    identifierSource: yup.string()
  }),
  logo: yup.object({
    type: yup.string().oneOf(['url', 'fileName']),
    fileName: yup.string(),
    url: yup.string().url()
  }),
  // registrationPageURL: yup.string().url('Please enter a valid URL').nullable(),
  registrationPageURL: yup.string()
  .when('$isExperiment', {
    is: true, // Si isExperiment est true dans le contexte de validation
    then: yup.string(), // Alors le champ n'est pas requis
    otherwise: yup.string() // Sinon, appliquez la logique existante
      .when('privacy', {
        is: (value) => ['registered', 'controlled', 'private'].includes(value),
        then: yup.string()
          .required('Registration page is required when privacy is set to registered, controlled, or private.')
          .test(
            'is-url-or-email',
            'Registration page must be a valid URL or email address',
            (value) => {
              const urlPattern = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i');
              const emailPattern = new RegExp('^\\S+@\\S+\\.\\S+$');
              return urlPattern.test(value) || emailPattern.test(value);
            }
          ),
        otherwise: yup.string()
      })
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
  reb_info: yup.string()
    .when('privacy', {
      is: (privacy) => ['registered', 'controlled', 'private'].includes(privacy),
      then: yup.string(),
      otherwise: yup.string().oneOf(['option_1', 'option_2', 'option_3', 'option_4'])
        .required('reb_info is required unless privacy is registered, controlled, or private.')
  }),
  reb_number: yup.string(),
  experimentsFunctionAssessed: yup.array().of(yup.string()),
  experimentsLanguages: yup.array().of(yup.string()),
  experimentsValidationMeasures: yup.array().of(yup.string()),
  experimentsValidationPopulations: yup.array().of(yup.string()),
  experimentsAccessibility: yup.array().of(yup.string()),
  experimentsSpecies: yup.array().of(yup.string()),
  experimentsModalities: yup.array().of(yup.string()),
  experimentsRequiredDevices: yup.array().of(yup.string()),
  experimentsRequiredSoftware: yup.array().of(
    yup.object({
      software: yup.string(),
      version: yup.string()
    })
  ),
  experimentsStimuli: yup.array().of(yup.string()),
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
  licenses: [''],
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
  registrationPageURL: '',
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
