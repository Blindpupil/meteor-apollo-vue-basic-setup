<template>
	<div>
		<h1>{{ hi }}</h1>
		<p>{{ userInfo }}</p>

		<div v-if="user">
			<button @click="logout">Logout</button>

			<h2>Your Resolutions</h2>
			<ul>
				<li v-for="res in resolutions" :key="res._id">
					{{ res.name }}
					<button @click="destroy(res._id)">Delete</button>
					<GoalForm :resolution-id="res._id"></GoalForm>
				</li>
			</ul>

			<h3>Add new resolution</h3>
			<Form></Form>
		</div>

		<div v-if="!user">
			<Login></Login>
			<h2>OR</h2>
			<Register></Register>
		</div>
	</div>
</template>

<script>
  import gql from 'graphql-tag'
  import Form from '../../ui/Form.vue'
  import Login from '../../ui/Login.vue'
  import Register from '../../ui/Register'
  import GoalForm from '../../ui/GoalForm.vue'

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
      GoalForm,
    },
    data() {
      return {
        hi: '',
        resolutions: [],
        user: {},
      }
    },
    computed: {
      userInfo() {
        const userId = this.user ? this.user.email : null
        if (userId) {
          return `You're logged in as ${ userId }`
        }
        return `You're logged out`
      },
    },
    apollo: {
      hi: gql`query { hi }`,
      resolutions: gql`query {
				resolutions {
					_id
					name
				}
				goals {
				  name
				  completed
				}
			}`,
      user: gql`query {
				user {
					_id
					email
				}
			}`,
    },
    methods: {
      async destroy(id) {
        try {
          await this.$apollo.mutate({
            mutation: destroy,
            variables: { id },
            refetchQueries: ['resolutions', 'user'],
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