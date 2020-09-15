import moment from 'moment'

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
          date: moment(date.date).format('YYYY-MM-DD'),
          type: date.type
        }
      }),
      creators: this.data.creators.map((creator) => {
        const c = {
          name: creator.name
        }
        if (creator.role) c.role = creator.role
        if (creator.email) c.email = creator.email
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
          name: license.value
        }
      }),
      distributions: [
        {
          formats: this.data.formats,
          size: this.data.size.value,
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
              date: moment(date.date).format('YYYY-MM-DD')
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

      extraProperties: [
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
        this.data.origin.institution
          ? {
              category: 'origin_institution',
              values: [
                {
                  value: this.data.origin.institution
                }
              ]
            }
          : null,
        this.data.origin.consortium
          ? {
              category: 'origin_consortium',
              values: [
                {
                  value: this.data.origin.consortium
                }
              ]
            }
          : null,
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
        }
      ]
    }

    return Object.assign({}, json)
  }
}

export default FormToDats
