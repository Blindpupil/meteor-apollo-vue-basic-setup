<template>
	<div>
		<input type="checkbox" v-model="goal.completed" @click="toggleGoal(goal._id)">
		{{ goal.name }}
		<button @click="destroyGoal(goal._id)">Delete Goal</button>
	</div>
</template>

<script>
  import gql from 'graphql-tag'

  const deleteGoal = gql`mutation ($id: String!) {
		deleteGoal(id: $id) { _id }
	}`

  const toggleGoal = gql`mutation ($id: String!) {
		toggleGoal(id: $id) { _id }
	}`

  export default {
    props: {
      goal: Object,
    },
    name: 'Goal',
    data: () => ({
      status: false,
    }),
    methods: {
      async destroyGoal(id) {
        try {
          await this.$apollo.mutate({
            mutation: deleteGoal,
            variables: { id },
            refetchQueries: ['resolutions'],
          })
        } catch(e) {
          console.log(e)
        }
      },
      async toggleGoal(id) {
        try {
          await this.$apollo.mutate({
            mutation: toggleGoal,
            variables: { id },
            refetchQueries: ['resolutions'],
          })
        } catch(e) {
          console.log(e)
        }
      },
    },
  }
</script>
