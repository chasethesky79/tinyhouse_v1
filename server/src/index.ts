import dotenv from 'dotenv'
dotenv.config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql';
import { connectToDatabase } from './database';

const mount = async (app: Application ) => {
    const db = await connectToDatabase();
    const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) });
    server.applyMiddleware({ app, path: '/api'});
    console.log(`Server started at http://localhost:${process.env.PORT}`);
    app.listen(process.env.PORT);
}

mount(express())
