<template>
	<div>
		<h1>{{ hi }}</h1>
		<p>{{ userInfo }}</p>

		<div v-if="user">
			<button @click="logout">Logout</button>

			<h2>Your Resolutions</h2>
			<ul>
				<li v-for="res in resolutions" :key="res._id">
					<div>
						<span :class="res.completed ? 'completed' : ''">
							{{ res.name }}
						</span>
						<button @click="destroyRes(res._id)">Delete</button>
					</div>
					<div class="pad1">
						<h4 class="pad1 ma0">Goals</h4>
						<ul>
							<Goal v-for="goal in res.goals" :goal="goal" :key="goal._id"></Goal>
						</ul>
						<GoalForm :resolution-id="res._id"></GoalForm>
					</div>
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
  import Form from '../../ui/Form'
  import Login from '../../ui/Login'
  import Register from '../../ui/Register'
  import Goal from '../../ui/Goal'
  import GoalForm from '../../ui/GoalForm'

  const deleteResolution = gql`mutation ($id: String!) {
    deleteResolution(id: $id) { _id }
  }`

  const resolutions = gql`query resolutions {
		resolutions {
			_id
			name
			completed
			goals {
				_id
				name
				completed
			}
		}
	}`

  export default {
    name: 'App',
    components: {
      Register,
      Form,
      Login,
      Goal,
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
      resolutions,
      user: gql`query {
				user {
					_id
					email
				}
			}`,
    },
    methods: {
      async destroyRes(id) {
        try {
          await this.$apollo.mutate({
            mutation: deleteResolution,
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

<style>
	.pad1 {
		padding: 8px;
	}

	.ma0 {
		margin: 0;
	}

	.completed {
		text-decoration: line-through;
	}
</style>