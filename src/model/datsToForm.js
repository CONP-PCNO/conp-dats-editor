class DatsToForm {
  constructor(data) {
    this.data = data
  }

  getJson() {
    return {
      title: 'test title',
      creators: [
        {
          type: 'pi',
          name: '',
          email: ''
        }
      ],
      contact: {
        name: '',
        email: ''
      },
      description: '',
      types: [''],
      version: '',
      licenses: [''],
      keywords: [''],
      formats: [''],
      size: {
        value: '',
        units: 'mb'
      },
      privacy: 'public',
      files: '',
      subjects: '',
      conpStatus: '',
      derivedFrom: '',
      parentDatasetId: '',
      primaryPublications: [],
      dimensions: [],
      identifier: {
        name: '',
        source: ''
      },
      logo: '',
      date: {
        date: '',
        description: ''
      },
      dates: [],
      citations: [],
      producedBy: '',
      isAbout: [],
      hasPart: '',
      acknowledges: '',
      refinement: '',
      aggregation: '',
      spatialCoverage: [],
      attachments: []
    }
  }
}

export default DatsToForm
