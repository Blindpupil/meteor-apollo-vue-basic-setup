<template>
	<div>
		<small>Add goal </small>
		<input type="text" v-model="name">
		<button @click="add"> Add</button>
	</div>
</template>

<script>
  import gql from 'graphql-tag'

  const create = gql`
    mutation ($name: String!, $resolutionId: String!) {
      createGoal(name: $name, resolutionId: $resolutionId) {
        _id
      }
    }`

  export default {
    name: 'GoalForm',
    props: {
      resolutionId: String,
    },
    data: () => ({
      name: '',
    }),
    methods: {
      async add() {
        try {
          await this.$apollo.mutate({
            mutation: create,
            variables: {
              name: this.name,
              resolutionId: this.resolutionId,
            },
            refetchQueries: ['resolutions'],
          })
          this.name = ''
        } catch(e) {
          console.log(e)
        }
      },
    },
  }
</script>

<style scoped>

</style>