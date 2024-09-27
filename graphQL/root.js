const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const Document = require('../models/Doc');
const Users = require('../models/Users'); 
const UserType =  require('./userType');
const DocumentType = require('./documentType');


// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query for fetching data',
    fields: () => ({
        documents: {
            type: new GraphQLList(DocumentType),
            resolve: async () => {
                return await Document.find(); 
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: async () => {
                return await Users.find(); 
            },
        },
        documentById: {
            type: DocumentType,
            args: { _id: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (_, { _id }) => {
                return await Document.findById(_id); 
            },
        },
        userById: {
            type: UserType,
            args: { _id: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (_, { _id }) => {
                return await Users.findById(_id);
            },
        },
    }),
});

module.exports = RootQuery;
