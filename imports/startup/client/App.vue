<template>
    <div>
        <h1>{{ hi }}</h1>

        <Form :resolutions="this.$apollo.queries.resolutions"></Form>

        <h2>Resolutions</h2>
        <ul>
            <li v-for="res in resolutions" :key="res._id">
                {{ res.name }}
            </li>
        </ul>
    </div>
</template>

<script>
  import gql from 'graphql-tag'
  import Form from '../../ui/Form.vue'

  const resolutions = gql`query {
    resolutions {
      _id
      name
    }
  }`

  export default {
    name: 'App',
    components: { Form },
    data: () => ({}),
    apollo: {
      hi: gql`query { hi }`,
      resolutions,
    },
    methods: {
      doit() {
        console.log(this.$apollo)
      },
    },
  }
</script>

<style scoped>

</style>