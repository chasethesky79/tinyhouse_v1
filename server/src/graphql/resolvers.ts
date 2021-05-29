import { IResolvers } from 'apollo-server-express';
import { Database, Listing } from '../lib/types';
import { ObjectId } from "mongodb";

export const resolvers: IResolvers = {
    Query: {
        listings: async (_root: undefined, _args: Record<string, never>, { db }: { db: Database }): Promise<Listing[]> => {
            return await db.listings.find({}).toArray(); 
        }
    },
    Mutation: {
        deleteListing: async (_root: undefined, { id }: { id: string }, { db }: { db: Database }): Promise<Listing> => {
            const query = { _id: new ObjectId(id) };
            const deletedObj = await db.listings.findOneAndDelete(query);
            if (!deletedObj?.value) {
                throw new Error('Unable to delete listing from monggodb')
            }
            return deletedObj.value
        } 
    },
    Listing: {
        id: (listing: Listing): string => listing._id.toString()
    }
};