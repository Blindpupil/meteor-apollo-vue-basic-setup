<template>
    <div>
        <input type="text" v-model="name">
        <button @click="submit"> Submit</button>
    </div>
</template>

<script>
  import gql from 'graphql-tag'

  const mutation = gql`
    mutation ($name: String!) {
      createResolution(name: $name) {
        _id
      }
    }`

  export default {
    props: {
      resolutions: Object,
    },
    name: 'Form',
    data: () => ({
      name: '',
    }),
    methods: {
      async submit(event) {
        event.preventDefault()
        try {
          await this.$apollo.mutate({
            mutation,
            variables: {
              name: this.name,
            },
          })
          this.resolutions.refetch()
        } catch(e) {
          console.log(e)
        }
      },
    },
  }
</script>

<style scoped>

</style>