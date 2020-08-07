class DatsToForm {
  constructor(data) {
    this.data = data
  }

  getJson() {
    return {
      title: this.data.title || '',
      creators:
        this.data.creators.map((a) => {
          return {
            name: a.name,
            email: '',
            role: 'contributor'
          }
        }) || [],
      contact:
        this.data.extraProperties
          .filter((p) => p.category === 'contact')[0]
          .values.map((a) => {
            return {
              name: a.value.split(', ')[0],
              email: a.value.split(', ')[1] || ''
            }
          })[0] || '',
      description: this.data.description || '',
      types: this.data.types.map((a) => a.information.value) || [],
      version: this.data.version || '',
      licenses: this.data.licenses.map((a) => a.name) || [],
      keywords: this.data.keywords.map((a) => a.value) || [],
      formats: this.data.distributions[0]?.formats || [],
      size: {
        value: this.data.distributions[0]?.size || '',
        units: this.data.distributions[0]?.unit.value.toLowerCase() || ''
      },
      access: {
        landingPage: this.data.distributions[0].access.landingPage || '',
        authorization:
          this.data.distributions[0]?.access?.authorizations[0]?.value ||
          'public'
      },
      privacy: this.data.privacy || '',
      files:
        this.data.extraProperties
          ?.filter((p) => p.category === 'files')[0]
          .values.map((a) => a.value)[0] || '',
      subjects:
        this.data.extraProperties
          ?.filter((p) => p.category === 'subjects')[0]
          .values.map((a) => a.value)[0] || '',
      conpStatus:
        this.data.extraProperties
          ?.filter((p) => p.category === 'CONP_status')[0]
          .values.map((a) => a.value)[0]
          .toLowerCase() || '',
      derivedFrom: '',
      parentDatasetId: '',
      primaryPublications:
        this.data.primaryPublications?.map((a) => a.title) || [],
      dimensions: [],
      identifier: {
        name: '',
        source: ''
      },
      logo:
        this.data.extraProperties
          ?.filter((p) => p.category === 'logo')[0]
          .values.map((a) => a.value)[0] || '',
      date: {
        date: '',
        description: ''
      },
      dates: [],
      citations: [],
      producedBy: '',
      isAbout: this.data.isAbout?.map((a) => a.name) || [],
      hasPart: '',
      acknowledges: '',
      refinement: '',
      aggregation: this.data.aggregation || '',
      spatialCoverage: this.data.spatialCoverage?.map((a) => a.name) || [],
      attachments: []
    }
  }
}

export default DatsToForm
