import React from 'react';
import { server } from '../../lib/api';
import { ListingsData } from './types';

interface Props {
    title: string
}

const LISTINGS = `
  query Listings {
      listings {
          id,
          title,
          image,
          address,
          price,
          numOfGuests,
          numOfBeds,
          numOfBaths,
          rating
      }
  }
`

export const Listings = ({ title }: Props) => { 
    const fetchListings = async () => {
      const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
      console.log(`LISTINGS ${JSON.stringify(data.listings)}`);
    }

    return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Fetch Listings</button>
    </div>
    )
} 