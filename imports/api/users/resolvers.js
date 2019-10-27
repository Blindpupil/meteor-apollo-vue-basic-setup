export default {
  Query: {
    user: (obj, args, { user }) => user,
  },
  User: {
    _id: user => user._id,
    email: user => user.emails[0].address,
  },
}