import React from 'react';
import { server } from '../../lib/api';

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
          price
      }
  }
`

export const Listings = ({ title }: Props) => { 
    const fetchListings = async () => {
      const { data } = await server.fetch({ query: LISTINGS });
      console.log(`LISTINGS ${JSON.stringify(data)}`);
    }

    return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Fetch Listings</button>
    </div>
    )
} 