import React from 'react';
import { server } from '../../lib/api';
import { DeleteListingData, DeleteListingVariables, Listing, ListingsData } from './types';
import { useState, useEffect } from 'react';

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
    useEffect(() => {
      fetchListings();
    }, [])
    const fetchListings = async () => {
      const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
      setListings(data.listings);
    }

    const deleteListing = async (id : string) => {
      await server.fetch<DeleteListingData, DeleteListingVariables>({ 
        query: DELETE_LISTING, 
        variables: {
          id
      }})
    }

    const onDeleteListing = (id: string) => {
      deleteListing(id);
      fetchListings();
    }
    
    return (
    <div>
      <h2>{title}</h2>
      <ul>
        {listings && listings.map((listing) => 
           <li key={listing.id}>{listing.title} <button onClick={() => onDeleteListing(listing.id)}>Delete Listing</button></li>
        )}
      </ul>
    </div>
    )
  }