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
    const {state, refreshListings} = useQuery<ListingsData>(LISTINGS);
    const deleteListing = async (id : string) => {
      await server.fetch<DeleteListingData, DeleteListingVariables>({ 
        query: DELETE_LISTING, 
        variables: {
          id
      }});
      refreshListings();
    }
    const onDeleteListing = (id: string) => {
      deleteListing(id);
    }

    if (state?.loading) {
      return (
        <h2>Loading...</h2>
      )
    }
    
    return (
    <div>
      <h2>{title}</h2>
      <ul>
        {state?.data?.listings?.map((listing: Listing) => 
           <li key={listing.id}>{listing.title} <button onClick={() => onDeleteListing(listing.id)}>Delete Listing</button></li>
        )}
      </ul>
    </div>
    )
  }