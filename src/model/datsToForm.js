class DatsToForm {
  constructor(data) {
    this.data = data
  }

  getJson() {
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
      keywords: this.data.keywords.map((a) => a?.value) || [],
      formats: this.data.distributions[0]?.formats || [],
      size: {
        value: this.data.distributions[0]?.size || '',
        units: this.data.distributions[0]?.unit?.value.toUpperCase() || ''
      },
      access: {
        landingPage: this.data.distributions[0]?.access?.landingPage || '',
        authorization:
          this.data.distributions[0]?.access?.authorizations?.[0]?.value ||
          'public'
      },
      privacy: this.data.privacy || '',
      files:
        this.data.extraProperties
          ?.filter((p) => p.category === 'files')[0]
          ?.values.map((a) => a.value)[0] || '',
      subjects:
        this.data.extraProperties
          ?.filter((p) => p.category === 'subjects')[0]
          ?.values.map((a) => a.value)[0] || '',
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
      dates: this.data.dates || [],
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
      reb_info: this.data.reb_info || '',
      reb_number: this.data.reb_number || '',
      experimentsFunctionAssessed:
        this.data.extraProperties
          ?.filter((p) => p.category === 'experimentFunctionAssessed')[0]
          ?.values.map((a) => a.value)[0] || '',
      experimentsRepeatability: false,
      experimentsLanguages:
        this.data.extraProperties
          ?.filter((p) => p.category === 'experimentLanguages')[0]
          ?.values.map((a) => a.value) || [],
      experimentsValidation:
        this.data.extraProperties
          ?.filter((p) => p.category === 'experimentValidation')[0]
          ?.values.map((a) => a.value) || [],
      experimentsAccessibility:
        this.data.extraProperties
          ?.filter((p) => p.category === 'experimentAccessibility')[0]
          ?.values.map((a) => a.value) || [],
      experimentsSpecies:
        this.data.extraProperties
          ?.filter((p) => p.category === 'experimentSpecies')[0]
          ?.values.map((a) => a.value) || [],
      experimentsRequiredPlatforms:
        this.data.extraProperties
          ?.filter((p) => p.category === 'experimentRequiredPlatforms')[0]
          ?.values.map((a) => a.value) || [],
      experimentsRequiredDevices:
        this.data.extraProperties
          ?.filter((p) => p.category === 'experimentRequiredDevices')[0]
          ?.values.map((a) => a.value) || [],
      experimentsRequiredSoftware:
        this.data.extraProperties
          ?.filter((p) => p.category === 'experimentRequiredSoftware')[0]
          ?.values.map((a) => a.value) || [],
      experimentsAdditionalRequirements:
        this.data.extraProperties
          ?.filter((p) => p.category === 'experimentFunctionAssessed')[0]
          ?.values.map((a) => a.value)[0] || ''
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
      return Object.assign(date, { date: new Date(date.date) })
    })

    json.primaryPublications = json.primaryPublications.map((pp) => {
      return Object.assign(pp, {
        dates: (pp?.dates || []).map((date) => {
          return Object.assign(date, { date: new Date(date.date) })
        })
      })
    })

    json.licenses.forEach((license, index) => {
      if (
        [
          'CC BY',
          'CC BY-SA',
          'CC BY-NC',
          'CC BY-NC-SA',
          'CC BY-ND',
          'CC BY-NC-ND',
          'ODbL',
          'ODC-By',
          'PDDL'
        ].includes('license')
      ) {
        json.licenses[index] = {
          value: license,
          valueOther: ''
        }
      } else {
        json.licenses[index] = {
          value: 'other',
          valueOther: license
        }
      }
    })

    return json
  }
}

export default DatsToForm
