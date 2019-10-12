<template>
	<div>
		<h1>{{ hi }}</h1>
		<p>{{ userInfo }}</p>
		<button @click="logout">Logout</button>

		<h2>Add resolution</h2>
		<Form></Form>

		<h2>Resolutions</h2>
		<ul>
			<li v-for="res in resolutions" :key="res._id">
				{{ res.name }}
				<button @click="destroy(res._id)">Delete</button>
			</li>
		</ul>

		<Login></Login>

		<h1>OR</h1>

		<Register></Register>
	</div>
</template>

<script>
  import gql from 'graphql-tag'
  import Form from '../../ui/Form.vue'
  import Login from '../../ui/Login.vue'
  import Register from '../../ui/Register'

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
    components: {
      Register,
      Form,
      Login,
    },
    data() {
      return {
        userId: Meteor.userId(),
      }
    },
    computed: {
      userInfo() {
        userId = Meteor.userId()
        if (userId) {
          return `You're logged in as ${ userId }`
        }
        return `You're logged out`
      },
    },
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
      logout() {
        Meteor.logout()
        this.$apolloProvider.defaultClient.resetStore()
      },
    },
  }
</script>

<style scoped>

</style>