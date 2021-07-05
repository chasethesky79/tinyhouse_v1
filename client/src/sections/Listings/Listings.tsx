import React from 'react';
import { server } from '../../lib/api';
import { DeleteListingData, DeleteListingVariables, ListingsData } from './types';

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
const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
  deleteListing(id: $id) {
    id,
    title
  }
}`
  

export const Listings = ({ title }: Props) => { 
    const fetchListings = async () => {
      const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
      console.log(`LISTINGS ${JSON.stringify(data.listings)}`);
    }

    const deleteListing = async () => {
      const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({ 
        query: DELETE_LISTING, 
        variables: {
          id: '60aaa71e7bacb6f18be5f70d'
      }})
      console.log(`LISTINGS ${JSON.stringify(data.deleteListing)}`);
    }

    return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Fetch Listings</button>
      <button onClick={deleteListing}>Delete Listings</button>
    </div>
    )
} 