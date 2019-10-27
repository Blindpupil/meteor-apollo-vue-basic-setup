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
    toggleGoal(parent, { id }) {
      const goal = Goals.findOne(id)
      Goals.update(id, {
        $set: {
          completed: !goal.completed,
        },
      })
      return goal
    },
  },
}