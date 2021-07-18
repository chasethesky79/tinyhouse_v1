import { server, useQuery } from '../../lib/api';
import { DeleteListingData, DeleteListingVariables, Listing, ListingsData } from './types';

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
    const state = useQuery<ListingsData>(LISTINGS);

    const deleteListing = async (id : string) => {
      await server.fetch<DeleteListingData, DeleteListingVariables>({ 
        query: DELETE_LISTING, 
        variables: {
          id
      }})
    }

    const onDeleteListing = (id: string) => {
      deleteListing(id);
    }
    
    return (
    <div>
      <h2>{title}</h2>
      <ul>
        {state && state?.data?.listings.map((listing: Listing) => 
           <li key={listing.id}>{listing.title} <button onClick={() => onDeleteListing(listing.id)}>Delete Listing</button></li>
        )}
      </ul>
    </div>
    )
  }