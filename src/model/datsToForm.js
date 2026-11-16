import { parseISO } from 'date-fns'

function readExtraProperties(data, category) {
  return (
    data.extraProperties
      ?.filter((property) => property.category === category)[0]
      ?.values.map((val) => val.value) || []
  )
}

// Fields and extra properties the form edits. Anything else in a loaded
// record (e.g. availability, storedIn, a "Timepoint description" property) is
// kept aside in _preserved and written back unchanged on save (formToDats), so
// editing a record in the editor never silently drops its other metadata.
export const HANDLED_FIELDS = [
  'title', 'description', 'identifier', 'dates', 'creators', 'types', 'version', 'privacy', 'licenses',
  'keywords', 'distributions', 'primaryPublications', 'isAbout', 'spatialCoverage', 'aggregation',
  'dimensions', 'acknowledges', 'extraProperties'
]
export const HANDLED_PROPERTIES = [
  'CONP_status', 'ORCID', 'REB_number', 'REB_statement', 'contact', 'derivedFrom', 'files', 'logo',
  'origin_city', 'origin_consortium', 'origin_country', 'origin_institution', 'origin_province',
  'parent_dataset_id', 'registrationPage', 'subjects', 'experimentAccessibility',
  'experimentAdditionalRequirements', 'experimentFunctionAssessed', 'experimentLanguages',
  'experimentModalities', 'experimentRequiredDevices', 'experimentRequiredSoftware', 'experimentStimuli',
  'experimentValidationMeasures', 'experimentValidationPopulations'
]

export function preservedParts(data) {
  const fields = {}
  Object.keys(data || {}).forEach((key) => {
    if (!HANDLED_FIELDS.includes(key)) fields[key] = data[key]
  })
  const extraProperties = ((data && data.extraProperties) || []).filter(
    (p) => p && !HANDLED_PROPERTIES.includes(p.category)
  )
  // Detail inside fields the form shows in a simpler form, restored on save
  // when the visible value is unchanged: InterLex IRIs on types, licence
  // identifiers, extra distribution keys (storedIn), the full contact line,
  // full publication dates (the form keeps the year).
  const detail = { types: {}, licenses: {}, distribution: null, contact: null, publicationDates: [] }
  ;((data && data.types) || []).forEach((t) => {
    const v = t && t.information && t.information.value
    if (v) detail.types[v] = t
  })
  ;((data && data.licenses) || []).forEach((l) => {
    if (l && l.name) detail.licenses[l.name] = l
  })
  const dist = data && data.distributions && data.distributions[0]
  if (dist) detail.distribution = dist
  const contact = ((data && data.extraProperties) || []).find((p) => p && p.category === 'contact')
  if (contact) detail.contact = contact
  detail.publicationDates = ((data && data.primaryPublications) || []).map((p) => (p && p.dates) || [])
  return { fields, extraProperties, detail }
}

class DatsToForm {
  constructor(data) {
    this.data = data
  }

  getJson() {
    const subjectsProperty = this.data.extraProperties?.find((p) => p.category === 'subjects') || {
      values: [{ value: "N/A" }]
    };
    
    const json = {
      title: this.data.title || '',
      creators:
        this.data.creators.map((a) => {
          return {
            ...a,
            type: Object.keys(a).includes('fullName')
              ? 'Person'
              : 'Organization',
            role: a.roles?.[0].value || '',
            orcid: a.extraProperties?.[0].values?.[0].value
          }
        }) || [],
      contact:
        this.data.extraProperties
          .filter((p) => p.category === 'contact')[0]
          ?.values.map((a) => {
            const split = a.value.split(', ')
            const contact = {
              name: split[0]
            }
            split.forEach((v) => {
              if (v.includes('@')) {
                contact.email = v
              }
            })
            return contact
          })[0] || '',
      description: this.data.description || '',
      types: this.data.types.map((a) => a?.information?.value) || [],
      version: this.data.version || '',
      licenses: this.data.licenses.map((a) => a?.name) || [],
      keywords: this.data.keywords?.map((a) => a?.value) || [],
      formats: this.data.distributions[0]?.formats || [],
      size: {
        value: this.data.distributions[0]?.size || '',
        units: this.data.distributions[0]?.unit?.value.toUpperCase() || ''
      },
      access: {
        landingPage: this.data.distributions[0]?.access?.landingPage || 'N/A',
        authorization:
          this.data.distributions[0]?.access?.authorizations?.[0]?.value ||
          'public'
      },
      privacy: this.data.privacy || '',
      files:
        this.data.extraProperties
          ?.filter((p) => p.category === 'files')[0]
          ?.values.map((a) => a.value)[0] || '',
      subjects: {
        applicable: subjectsProperty.values.length > 0,
        value: subjectsProperty.values.map((a) => {
          const parsedValue = parseInt(a.value, 10);
          return isNaN(parsedValue) || parsedValue <= 0 ? null : parsedValue;
        })[0] || null
      },
      conpStatus:
        this.data.extraProperties
          ?.filter((p) => p.category === 'CONP_status')[0]
          ?.values.map((a) => a.value)[0] || '',
      origin: {
        institution:
          this.data.extraProperties
            ?.filter((p) => p.category === 'origin_institution')[0]
            ?.values.map((a) => a.value)[0] || '',
        consortium:
          this.data.extraProperties
            ?.filter((p) => p.category === 'origin_consortium')[0]
            ?.values.map((a) => a.value)[0] || '',
        city:
          this.data.extraProperties
            ?.filter((p) => p.category === 'origin_city')[0]
            ?.values.map((a) => a.value)[0] || '',
        province:
          this.data.extraProperties
            ?.filter((p) => p.category === 'origin_province')[0]
            ?.values.map((a) => a.value)[0] || '',
        country:
          this.data.extraProperties
            ?.filter((p) => p.category === 'origin_country')[0]
            ?.values.map((a) => a.value)[0] || ''
      },
      derivedFrom:
        this.data.extraProperties
          ?.filter((p) => p.category === 'derivedFrom')[0]
          ?.values.map((a) => a.value)[0] || '',
      parentDatasetId:
        this.data.extraProperties
          ?.filter((p) => p.category === 'parent_dataset_id')[0]
          ?.values.map((a) => a.value)[0] || '',
      primaryPublications: this.data.primaryPublications || [],
      dimensions:
        this.data.dimensions?.map((a) => {
          return {
            name: a.name.value,
            description: a.description
          }
        }) || [],
      identifier: this.data.identifier || {
        identifier: '',
        identifierSource: ''
      },
      logo:
        this.data.extraProperties
          ?.filter((p) => p.category === 'logo')[0]
          ?.values.map((a) => a.value)[0] || '',
      registrationPageURL: 
        this.data.extraProperties
          .filter((prop) => prop.category === 'registrationPage')
          .flatMap((prop) => prop.values)
          .map((val) => val.value)[0] || '',
      dates:
        this.data.dates?.map((dateVal) => ({
          date: dateVal.date,
          description: dateVal.type.value
        })) || [],
      citations: [],
      producedBy: '',
      isAbout:
        this.data.isAbout?.map((a) => {
          return {
            ...a,
            type:
              Object.keys(a).includes('identifier') &&
              a.identifier.identifier.match(/taxonomy/)
                ? 'Species'
                : 'Other Entity',
            name: a.name
          }
        }) || [],
      hasPart: '',
      acknowledges: this.data.acknowledges?.[0].funders || [],
      refinement: '',
      aggregation: this.data.aggregation || '',
      spatialCoverage: this.data.spatialCoverage || [],
      reb_info:
        this.data.extraProperties
          ?.filter((p) => p.category === 'REB_statement')[0]
          ?.values.map((a) => a.value) || '',
      reb_number: this.data.reb_number || '',
      experimentsFunctionAssessed:
        readExtraProperties(this.data, 'experimentFunctionAssessed') || [],
      experimentsLanguages:
        readExtraProperties(this.data, 'experimentLanguages') || [],
      experimentsValidationMeasures:
        readExtraProperties(this.data, 'experimentValidationMeasures') || [],
      experimentsValidationPopulations:
        readExtraProperties(this.data, 'experimentValidationPopulations') || [],
      experimentsAccessibility:
        readExtraProperties(this.data, 'experimentAccessibility') || [],
      experimentsModalities:
        readExtraProperties(this.data, 'experimentModalities') || [],
      experimentsRequiredDevices:
        readExtraProperties(this.data, 'experimentRequiredDevices') || [],
      experimentsRequiredSoftware:
        readExtraProperties(this.data, 'experimentRequiredSoftware')?.map(
          (val) => {
            const match = val.match(/^(?<software>.*)version (?<version>.*)$/u)
            return { software: match[1], version: match[2] }
          }
        ) || [],
      experimentsStimuli:
        readExtraProperties(this.data, 'experimentStimuli') || [],
      experimentsAdditionalRequirements:
        readExtraProperties(this.data, 'experimentAdditionalRequirements') || []
    }

    if (json.logo.includes('www')) {
      json.logo = {
        type: 'url',
        url: json.logo,
        fileName: ''
      }
    } else {
      json.logo = {
        type: 'fileName',
        url: '',
        fileName: json.logo
      }
    }

    json.dates = json.dates.map((date) => {
      // "2019-04-30" is a calendar date: read it in local time. new Date()
      // reads it as midnight UTC, i.e. 29 April anywhere west of Greenwich,
      // and every date shifted back a day each time a record was saved.
      const s = String(date.date || '')
      const local = /^\d{4}-\d{2}-\d{2}/.test(s) ? parseISO(s.slice(0, 10)) : new Date(s)
      return Object.assign(date, { date: local })
    })

    json.primaryPublications = json.primaryPublications.map((pp) => {
      return Object.assign(pp, {
        dates: (pp?.dates || []).map((date) => {
          // return Object.assign(date, { date: new Date(date.date) })
          // return Object.assign(date, { date: date.date }); 
          return Object.assign(date, { date: date.date.split('-')[0] });
        })
      })
    })
    json._preserved = preservedParts(this.data)
    return json
  }
}

export default DatsToForm
