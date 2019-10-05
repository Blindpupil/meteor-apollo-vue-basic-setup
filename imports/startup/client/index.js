import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import { Accounts } from 'meteor/accounts-base'
import ApolloClient from 'apollo-boost'

Vue.use(VueApollo)

const client = new ApolloClient({
  uri: Meteor.absoluteUrl('graphql'),
  request: operation =>
    operation.setContext(() => ({
      headers: {
        authorization: Accounts._storedLoginToken(),
      },
    })),
})

const apolloProvider = new VueApollo({
  defaultClient: client,
})

Meteor.startup(() => {
  new Vue({
    el: '#app',
    apolloProvider,
    ...App,
  })
})

