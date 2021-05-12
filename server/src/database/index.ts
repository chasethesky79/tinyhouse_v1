import { MongoClient } from 'mongodb';

const user = 'user_001';
const password = 'luckysesh1';
const cluster = 'cluster0';

const connectionUrl = `mongodb+srv://${user}:${password}@${cluster}.zwry6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectToDatabase = async () => {
    const connection = await MongoClient.connect(connectionUrl, { useNewUrlParser: true });
}