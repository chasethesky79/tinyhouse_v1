import React from 'react';
import { server } from '../../lib/api';
import { DeleteListingData, DeleteListingVariables, Listing, ListingsData } from './types';
import { useState } from 'react';

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
    const [listings, setListings] = useState<Listing[] | null>(null);
    const fetchListings = async () => {
      const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
      setListings(data.listings);
      console.log(`LISTINGS ${JSON.stringify(data.listings)}`);
    }

    const deleteListing = async () => {
      const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({ 
        query: DELETE_LISTING, 
        variables: {
          id: '60aaa71e7bacb6f18be5f70d'
      }})
    }
    

    return (
    <div>
      <h2>{title}</h2>
      <ul>
        {listings && listings.map((listing) => <li key={listing.id}>{listing.title}</li>)}
      </ul>
      <button onClick={fetchListings}>Fetch Listings</button>
      <button onClick={deleteListing}>Delete Listings</button>
    </div>
    )
  }