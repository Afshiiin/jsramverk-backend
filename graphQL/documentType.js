const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');

// Define DocumentType
const DocumentType = new GraphQLObjectType({
    name: 'Document',
    description: 'This represents a document',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        value: { type: GraphQLString },
        owner: { type: GraphQLString },
        allowed_users: { type: new GraphQLList(GraphQLString) },
    }),
});

module.exports = DocumentType;