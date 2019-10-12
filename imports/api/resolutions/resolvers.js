import Resolutions from './resolutions'

export default {
  Query: {
    resolutions: (obj, args, { user }) => {
      const userId = user ? user._id : null
      return Resolutions.find({ userId }).fetch()
    },
  },
  Mutation: {
    createResolution(parent, { name }, { user }) {
      const resolutionId = Resolutions.insert({
        name,
        userId: user._id,
      })
      return Resolutions.findOne(resolutionId)
    },
    deleteResolution(parent, { id }) {
      Resolutions.remove(id)
    },
  },
}