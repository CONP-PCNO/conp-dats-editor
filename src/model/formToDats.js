class FormToDats {
  constructor(data) {
    this.data = data
  }

  getJson() {
    const json = {
      identifier: {
        identifier: this.data.identifier.name,
        identifierSource: this.data.identifier.source
      },
      title: this.data.title,
      description: this.data.description,
      creators: this.data.creators,
      types: this.data.types.map((type) => {
        return {
          information: {
            value: type
          }
        }
      }),
      version: this.data.version,
      privacy: this.data.privacy,
      isAbout: this.data.isAbout.map((item) => {
        return {
          name: item
        }
      }),
      spatialCoverage: this.data.spatialCoverage.map((item) => {
        return {
          name: item
        }
      }),
      dimensions: this.data.dimensions.map((item) => {
        return {
          name: {
            value: item.name
          },
          description: item.description
        }
      }),
      licenses: this.data.licenses.map((license) => {
        return {
          name: license.value
        }
      }),
      aggregation: this.data.aggregation,
      keywords: this.data.keywords.map((keyword) => {
        return {
          value: keyword
        }
      }),
      distributions: [
        {
          formats: this.data.formats,
          access: {
            landingPage: this.data.access.landingPage,
            authorizations: [
              {
                value: this.data.access.authorization
              }
            ]
          },
          size: this.data.size.value,
          unit: {
            value: this.data.size.units
          }
        }
      ],
      extraProperties: [
        {
          category: 'contact',
          values: [
            {
              value: `${this.data.contact.name}, ${this.data.contact.email}`
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
          category: 'CONP_status',
          values: [
            {
              value: this.data.conpStatus
            }
          ]
        },
        {
          category: 'origin_institution',
          values: [
            {
              value: this.data.origin.institution
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
          category: 'files',
          values: [
            {
              value: this.data.files
            }
          ]
        },
        {
          category: 'subjects',
          values: [
            {
              value: this.data.subjects
            }
          ]
        }
      ]
    }

    return json
  }
}

export default FormToDats
