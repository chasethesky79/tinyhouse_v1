import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';

const app = express();
const port = 9000;

const server = new ApolloServer({ schema });
server.applyMiddleware({ app, path: '/api'});
console.log(`Server started at http://localhost:${port}`);

app.listen(port);
