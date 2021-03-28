import * as express from 'express';
import { createServer } from 'http';
import {ApolloServer } from 'apollo-server-express';

import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

//We created an Apollo Server to handle queries .... 
const apollo = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    playground:{
        endpoint: 'http://localhost:4000/graphql'
    }
});

//we created an express server 
var app = express();
//We use Apollo to apply middleware ....
apollo.applyMiddleware({app:app});

//websockets
const ws = createServer(app);
apollo.installSubscriptionHandlers(ws);


ws.listen({port: 4000},() =>{
    console.log("GraphQL API http://localhost:4000/graphql ");
    console.log("Sub URL (WS) ws://localhost:4000/graphql");
});