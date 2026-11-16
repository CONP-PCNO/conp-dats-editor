import * as yup from 'yup'

// A publication identifier may be a DOI in any common form (https://doi.org/10…,
// http://dx.doi.org/10…, doi:10…, or just 10…), an ARK, or a web address. Before,
// only https:// DOI and ARK URLs passed, so 29 of the 52 CONP records that cite a
// publication could not be loaded and saved again (Oct 2026). DOIs are written
// out as https://doi.org/… (formToDats).
export const doiRegex = /^(?:https?:\/\/(?:dx\.)?doi\.org\/|doi:\s*)?(10\.\d{4,9}\/\S+)$/i;
const arkRegex = /^(?:https?:\/\/[a-zA-Z0-9.-]+\/)?ark:\/?\d{5}\/\S+$/i;
const urlRegex = /^https?:\/\/\S+$/i;

const publicationSchema = yup.object().shape({
  title: yup.string().nullable(), // Le titre est facultatif
  publicationVenue: yup.string().nullable(),
  authors: yup.array()
    .nullable()
    .when('title', {
      is: (title) => !!title,
      then: yup.array()
        .of(
          yup.object().shape({
            // Only the full name is required: 12 of the 44 CONP records that
            // cite a publication list authors by full name alone (Oct 2026).
            fullName: yup.string().required('Full name is required'),
            firstName: yup.string().nullable(),
            lastName: yup.string().nullable(),
            middleInitial: yup.string().nullable(),
            affiliations: yup.array().of(yup.string().nullable()).nullable(),
          })
        )
        .min(1, 'At least one author is required if title is provided'), 
      otherwise: yup.array().nullable(),
    }),
  dates: yup.array().of(
    yup.object().shape({
      date: yup.date().nullable(),
      description: yup.string().nullable(),
    })
  ).nullable(),
  identifier: yup
    .object()
    .nullable()
    .when('title', {
      is: (title) => !!title,
      then: yup
        .object()
        .shape({
          identifier: yup
            .string()
            .nullable()
            .test(
              'is-doi-ark-or-url',
              'Give a DOI (e.g. 10.1016/j.dib.2020.105224), an ARK, or a web address, or leave it empty',
              (value) => !value || doiRegex.test(value.trim()) || arkRegex.test(value.trim()) || urlRegex.test(value.trim())
            ),
          identifierSource: yup.string().nullable(),
        }),
      otherwise: yup.object().shape({
        identifier: yup.string().nullable(),
        identifierSource: yup.string().nullable(),
      }),
    }),
});

const defaultDatsValidationSchema = yup.object({
  isExperiment: yup.boolean(),
  title: yup.string().required(),
  creators: yup.array().of(
    yup.object().shape({
      type: yup.string().required('Type is required'),
      name: yup.string().when('type', {
        is: 'Organization',
        then: yup.string().required('Name/Institution is required'),
        otherwise: yup.string().nullable(),
      }),
      fullName: yup.string().when('type', {
        is: 'Person',
        then: yup.string().required('Full name is required'),
        otherwise: yup.string().nullable()
      }),
      firstName: yup.string().when('type', {
        is: 'Person',
        then: yup.string().required('First name is required'),
        otherwise: yup.string().nullable()
      }),
      lastName: yup.string().when('type', {
        is: 'Person',
        then: yup.string().required('Last name is required'),
        otherwise: yup.string().nullable()
      }),
      email: yup.string().email('Invalid email format').nullable(),
      orcid: yup.string().when('type', {
        is: 'Person',
        then: yup.string().matches(
          /^https:\/\/orcid.org\/\d\d\d\d-\d\d\d\d-\d\d\d\d-\d\d\d[\dX]$/u,
          "The ORCID format must match: https://orcid.org/XXXX-XXXX-XXXX-XXXX"
        ).required('An ORCID is required'),
        otherwise: yup.string().nullable(),
      }).nullable()
    })
  ).min(1, 'At least one creator is required'),
  contact: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required()
  }),
  description: yup.string().required(),
  types: yup.array().of(yup.string().required()
  .notOneOf([""], "Type cannot be empty")).min(1).required("Type cannot be empty"),
  version: yup.string().required(),
  licenses: yup.array().of(yup.string().required("Licenses cannot be empty")).min(1, "At least one license is required").required("Licenses are required"),
  keywords: yup.array().of(yup.string().required()
  .notOneOf([""], "Keywords cannot be empty")).min(1).required("Keywords cannot be empty"),
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
  primaryPublications: yup.array().of(
    publicationSchema
  ),
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
  registrationPageURL: yup.string().when(['privacy', 'isExperiment'], {
    is: (privacy, isExperiment) => {
      return isExperiment || !['registered', 'controlled', 'private'].includes(privacy);
    },
    then: yup.string(),
    otherwise: yup.string()
      .required('Registration page is required when privacy is set to registered, controlled, or private.')
      .test('is-url-or-email', 'Registration page must be a valid URL or email address', (value) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i');
        const emailPattern = new RegExp('^\\S+@\\S+\\.\\S+$');
        return urlPattern.test(value) || emailPattern.test(value);
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
  // The ethics statement is about participants' data: required for open
  // datasets, never for experiments (tasks, not data from participants).
  reb_info: yup.string()
    .when(['privacy', 'isExperiment'], {
      is: (privacy, isExperiment) => isExperiment || ['registered', 'controlled', 'private'].includes(privacy),
      then: yup.string(),
      otherwise: yup.string().oneOf(['option_1', 'option_2', 'option_3', 'option_4'])
        .required('Choose the statement that applies to how these data may be shared openly.')
  }),
  reb_number: yup.string(),
  experimentsFunctionAssessed: yup.array().when('isExperiment', {
    is: true,
    then: yup.array().of(yup.string().required()),
    otherwise: yup.array().of(yup.string())
  }),
  experimentsLanguages: yup.array().when('isExperiment', {
    is: true,
    then: yup.array().of(yup.string().required()),
    otherwise: yup.array().of(yup.string())
  }),
  experimentsValidationMeasures: yup.array().of(yup.string()),
  experimentsValidationPopulations: yup.array().of(yup.string()),
  experimentsAccessibility: yup.array().of(yup.string()),
  experimentsSpecies: yup.array().of(yup.string()),
  experimentsModalities: yup.array().when('isExperiment', {
    is: true,
    then: yup.array().of(yup.string().required()),
    otherwise: yup.array().of(yup.string())
  }),
  experimentsRequiredDevices: yup.array().when('isExperiment', {
    is: true,
    then: yup.array().of(yup.string().required()),
    otherwise: yup.array().of(yup.string())
  }),
  experimentsRequiredSoftware: yup.array().when('isExperiment', {
    is : true,
    then: yup.array().of(
      yup.object({
        software: yup.string().required().matches(/^(?!\s*$).+/, 'Software name cannot be empty or just spaces'),
        version: yup.string()
      }))
  }),
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
  licenses: [],
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
