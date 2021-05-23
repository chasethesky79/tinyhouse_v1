import dotenv from 'dotenv';
dotenv.config();

import { connectToDatabase } from '../database/index';
import { listings } from '../listings';
import { Listing } from '../lib/types';
import { ObjectId } from "mongodb";

const seed = async () => {
    try {
    const db = await connectToDatabase();
    const listingsInput: Listing[] = listings.map((listing) => {
        const newObj = {...listing, _id: new ObjectId()};
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...newObjWithoutId } = newObj;
        return newObjWithoutId;
    });
    listingsInput.forEach(listingInput => db.listings.insertOne(listingInput));
    console.log(`[Seed] success`);
    } catch(error) {
        throw new Error(`Error occured during database connection ${error}`);
    }
}

seed();