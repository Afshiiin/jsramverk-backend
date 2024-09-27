const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

// Define UserType
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        u_email: { type: GraphQLNonNull(GraphQLString) },
    //  u_password: { type: GraphQLString },
    }),
});

module.exports = UserType;