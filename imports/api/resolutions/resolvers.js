import Resolutions from './resolutions'
import Goals from '../goals/goals'

export default {
  Query: {
    resolutions: (obj, args, { user }) => {
      const userId = user ? user._id : null
      return Resolutions.find({ userId }).fetch()
    },
  },

  Resolution: {
    goals: resolution => Goals.find({ resolutionId: resolution._id }).fetch(),
    completed: resolution => {
      const goals = Goals.find({ resolutionId: resolution._id }).fetch()

      if (goals.length === 0) return false

      const completedGoals = goals.filter(goal => goal.completed).length
      return goals.length === completedGoals
    },
  },

  Mutation: {
    createResolution(parent, { name }, { user }) {
      if (!user) throw new Error('Unauthorized')
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