import Resolutions from './resolutions'

export default {
  Query: {
    resolutions: () => Resolutions.find({}).fetch(),
  },
  Mutation: {
    createResolution(parent, { name }) {
      const resolutionId = Resolutions.insert({
        name,
      })
      return Resolutions.findOne(resolutionId)
    },
    deleteResolution(parent, { id }) {
      Resolutions.remove(id)
    },
  },
}