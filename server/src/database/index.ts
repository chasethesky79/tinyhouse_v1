import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';

const connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.zwry6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connectToDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('main');
    return {
        listings: db.collection('test_listings')
    }
}