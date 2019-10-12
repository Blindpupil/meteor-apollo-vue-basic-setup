<template>
	<div>
		<h3>Login</h3>
		<input type="email" v-model="email" placeholder="Email">
		<input type="password" v-model="password" placeholder="Password">
		<button @click="login">Login</button>
	</div>
</template>

<script>
  export default {
    name: 'Login',
    data: () => ({
      email: '',
      password: '',
    }),
    methods: {
      login() {
        Meteor.loginWithPassword(this.email, this.password,
          error => {
          	if (!error) this.$apolloProvider.defaultClient.resetStore()
            console.log(error)
          })
      },
    },
  }
</script>

<style scoped>

</style>