<template>
    <div>
        Coming from GraphQL directly:
        {{ hi }}
    </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'App',
    data: () => ({}),
    apollo: {
      hi: gql`query { hi }`,
    },
  }
</script>

<style scoped>

</style>