import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql';
import { connectToDatabase } from './database';

const mount = async (app: Application ) => {
    const db = await connectToDatabase();
    const port = 9000;
    const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) });
    server.applyMiddleware({ app, path: '/api'});
    console.log(`Server started at http://localhost:${port}`);
    app.listen(port);
    const listings = await db.listings.find( {} ).toArray();
    console.log(`LISTINGS ${JSON.stringify(listings)}`);
}

mount(express())
