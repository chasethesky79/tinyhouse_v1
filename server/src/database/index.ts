import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';

const user = 'user_001';
const password = 'luckysesh1';
const cluster = 'cluster0';

const connectionUrl = `mongodb+srv://${user}:${password}@${cluster}.zwry6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connectToDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(connectionUrl, { useNewUrlParser: true });
    const db = client.db('main');
    return {
        listings: db.collection('test_listings')
    }
}