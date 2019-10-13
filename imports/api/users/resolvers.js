export default {
  Query: {
    user: (obj, args, { user }) => {
      if (user) {
        return {
          _id: user._id,
          email: user.emails[0].address,
        }
      }
      return null
    },
  },
}