import * as yup from 'yup'

export const defaultValidationSchema = yup.object({
  title: yup.string().required(),
  creators: yup.array().of(
    yup.object({
      name: yup.string().required(),
      email: yup.string().email()
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
  formats: yup.array().of(yup.string()).min(1),
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
  privacy: yup.string().required(),
  files: yup.number().integer().positive().required(),
  subjects: yup.number().integer().positive().required(),
  conpStatus: yup.string().required(),
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
  spatialCoverage: yup.array().of(yup.string())
})
