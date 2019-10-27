<template>
	<div>
		<input type="text" v-model="name">
		<button @click="submit"> Submit</button>
	</div>
</template>

<script>
  import gql from 'graphql-tag'

  const create = gql`
    mutation ($name: String!) {
      createResolution(name: $name) {
        _id
      }
    }`

  export default {
    name: 'Form',
    data: () => ({
      name: '',
    }),
    methods: {
      async submit(event) {
        event.preventDefault()
        try {
          await this.$apollo.mutate({
            mutation: create,
            variables: {
              name: this.name,
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