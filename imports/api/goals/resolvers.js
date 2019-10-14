import Goals from './goals'

export default {
  Mutation: {
    createGoal(parent, { name, resolutionId }) {
      const goalId = Goals.insert({
        name,
        resolutionId,
        completed: false,
      })
      return Goals.findOne(goalId)
    },
    deleteGoal(parent, { id }) {
      Goals.remove(id)
    },
  },
}