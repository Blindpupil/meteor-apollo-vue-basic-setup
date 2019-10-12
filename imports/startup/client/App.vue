<template>
	<div>
		<h1>{{ hi }}</h1>

		<Form></Form>

		<h2>Resolutions</h2>
		<ul>
			<li v-for="res in resolutions" :key="res._id">
				{{ res.name }}
				<button @click="destroy(res._id)">Delete</button>
			</li>
		</ul>
	</div>
</template>

<script>
  import gql from 'graphql-tag'
  import Form from '../../ui/Form.vue'

  const resolutions = gql`query resolutions{
    resolutions {
      _id
      name
    }
  }`

  const destroy = gql`mutation ($id: String!) {
    deleteResolution(id: $id) {
      _id
    }
  }`

  export default {
    name: 'App',
    components: { Form },
    apollo: {
      hi: gql`query { hi }`,
      resolutions,
    },
    methods: {
      async destroy(id) {
        try {
          await this.$apollo.mutate({
            mutation: destroy,
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

<style scoped>

</style>