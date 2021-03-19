import { format } from 'date-fns'

class FormToDats {
  constructor(data) {
    this.data = data
  }

  getJson() {
    const json = {
      title: this.data.title,
      description: this.data.description,
      identifier: this.data.identifier,
      dates: this.data.dates.map((date) => {
        return {
          date: format(date.date, 'yyyy-MM-dd') + ' 00:00:00',
          type: {
            value: date.type.value.toLowerCase()
          }
        }
      }),
      creators: this.data.creators.map((creator) => {
        const c = creator
        delete c.type
        delete c.role
        if (creator.role)
          c.roles = [
            {
              value: creator.role
            }
          ]
        return c
      }),
      types: this.data.types.map((type) => {
        return {
          information: {
            value: type
          }
        }
      }),
      version: this.data.version,
      privacy: this.data.privacy,
      licenses: this.data.licenses.map((license) => {
        return {
          name: license.value !== 'other' ? license.value : license.valueOther
        }
      }),
      distributions: [
        {
          formats: this.data.formats,
          size: parseFloat(this.data.size.value),
          unit: {
            value: this.data.size.units
          },
          access: {
            landingPage: this.data.access.landingPage,
            authorizations: [
              {
                value: this.data.access.authorization
              }
            ]
          }
        }
      ],
      primaryPublications: this.data.primaryPublications.map((pp) => {
        return Object.assign(pp, {
          dates: pp.dates.map((date) => {
            return Object.assign(date, {
              date: format(date.date, 'yyyy-MM-dd') + ' 00:00:00'
              type: {
                value: 'publication date'
              }
            })
          })
        })
      }),
      isAbout: this.data.isAbout.map((item) => {
        return {
          name: item
        }
      }),
      spatialCoverage: this.data.spatialCoverage,
      aggregation: this.data.aggregation,
      dimensions: this.data.dimensions.map((item) => {
        return {
          name: {
            value: item.name
          },
          description: item.description
        }
      }),
      acknowledges: [
        {
          name: 'Grants',
          funders: this.data.acknowledges
        }
      ],

      keywords: this.data.keywords.map((keyword) => {
        return {
          value: keyword
        }
      }),

      extraProperties: []
    }

    const extraProperties = [
      {
        category: 'subjects',
        values: [
          {
            value: this.data.subjects
          }
        ]
      },
      {
        category: 'files',
        values: [
          {
            value: this.data.files
          }
        ]
      },
      {
        category: 'CONP_status',
        values: [
          {
            value: this.data.conpStatus
          }
        ]
      },
      {
        category: 'origin_city',
        values: [
          {
            value: this.data.origin.city
          }
        ]
      },
      {
        category: 'origin_province',
        values: [
          {
            value: this.data.origin.province
          }
        ]
      },
      {
        category: 'origin_country',
        values: [
          {
            value: this.data.origin.country
          }
        ]
      },
      {
        category: 'logo',
        values: [
          {
            value:
              this.data.logo.type === 'url'
                ? this.data.logo.url
                : this.data.logo.fileName
          }
        ]
      },
      {
        category: 'contact',
        values: [
          {
            value: `${this.data.contact.name}, ${this.data.contact.email}`
          }
        ]
      },
      {
        category: 'derivedFrom',
        values: [
          {
            value: this.data.derivedFrom
          }
        ]
      },
      {
        category: 'parent_dataset_id',
        values: [
          {
            value: this.data.parentDatasetId
          }
        ]
      }
    ]

    extraProperties.forEach((p) => {
      if (p.values[0].value) {
        json.extraProperties.push(p)
      }
    })

    if (this.data.origin.institution)
      json.extraProperties.splice(
        json.extraProperties.findIndex((e) => e.category === 'CONP_status') + 1,
        0,
        {
          category: 'origin_institution',
          values: [
            {
              value: this.data.origin.institution
            }
          ]
        }
      )
    if (this.data.origin.consortium)
      json.extraProperties.splice(
        json.extraProperties.findIndex((e) => e.category === 'CONP_status') + 1,
        0,
        {
          category: 'origin_consortium',
          values: [
            {
              value: this.data.origin.consortium
            }
          ]
        }
      )

    if (json.isAbout.length === 0) {
      delete json.isAbout
    }
    if (json.spatialCoverage.length === 0) {
      delete json.spatialCoverage
    }
    if (json.aggregation === '') {
      delete json.aggregation
    }
    if (json.dimensions.length === 0) {
      delete json.dimensions
    }
    if (json.acknowledges[0].funders.length === 0) {
      delete json.acknowledges
    }
    if (json.keywords.length === 0) {
      delete json.keywords
    }

    Object.keys(json).forEach((key) => json[key] == null && delete json[key])

    return json
  }
}

export default FormToDats
