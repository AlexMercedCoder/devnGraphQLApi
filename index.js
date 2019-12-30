//Require Dependencies
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

//Define Resolvers
const user = async(parent, args, context, info) => {
    log(args.username);
    const results = await Users.findOne({username: args.username});
    log(results);
    return results;
}

const blog = async(User) => {
    log(User);
    const results = await Blogs.find({user: User.username});
    log(results);
    return results;
}

const todos = async(User) => {
    log(User);
    const results = knex.select('entry').from('todoes').where({user: User.username});
    log(results);
    return results;
}


//Connect to Postgres Database for todos
const knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

//shorten up logging
const log = console.log;

//Connect to Mongo DB Database for Users and Blogs and Schemas
const dbupdateobject = { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false}
mongoose.connect(process.env.DB, dbupdateobject)
const Blogs = require('./schemas/blog.js');
const Users = require('./schemas/users.js');


//Define GraphQL Schemas
const typeDefs = gql`
    type User {
        username: String,
        favtech: String,
        bio: String,
        url: String
        blog:  [Post]
        todos: [Todo]
    }
    type Post {
        title: String,
        entry: String,
        tech: String
    }
    type Todo {
        entry: String,

    }
    type Query {
        user (username: String!): User
    }
`;

//Resolvers
const resolvers = {
    Query: {
        user
        }
    ,
    User: {
        blog,
        todos
    }
};



const server = new ApolloServer({typeDefs, resolvers});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
