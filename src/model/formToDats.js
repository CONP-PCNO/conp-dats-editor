class FormToDats {
  constructor(data) {
    this.data = data
  }

  getJson() {
    return {
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
      licenses: this.data.licenses.map((license) => {
        return {
          name: license
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
            landingPage: this.data.landingPage,
            authorizations: [
              {
                value: this.data.privacy
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
              value: this.data.logo
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
  }
}

export default FormToDats
