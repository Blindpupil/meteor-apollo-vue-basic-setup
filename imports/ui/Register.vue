<template>
	<div>
		<h3>Register</h3>
		<input type="email" v-model="email" placeholder="Email">
		<input type="password" v-model="password" placeholder="Password">
		<button @click="register">Register</button>
	</div>
</template>

<script>
  export default {
    name: 'Register',
    data: () => ({
      email: '',
      password: '',
    }),
    methods: {
      register() {
        Accounts.createUser({
          email: this.email,
          password: this.password,
        }, error => {
          if (!error) this.$apolloProvider.defaultClient.resetStore()
          console.log(error)
        })
      },
    },
  }
</script>

<style scoped>

</style>