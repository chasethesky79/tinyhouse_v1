import { useState, useEffect, useCallback } from "react";
import { server } from ".";
import { Body } from './server';

interface State<T> {
    data: T | null
}

interface Result<T> {
    state: State<T> | null;
    refreshListings: () => void
}

export const useQuery = <T = any, TVariables = any>(body: Body<TVariables>): Result<T> => {
    const { query, variables } = body;
    const [refreshId, setRefreshId] = useState<symbol>(Symbol('refetch.listings'));
    const refreshListings = useCallback(() => setRefreshId(Symbol('refetch.listings')), []);
    const [state, setState] = useState<State<T> | null>({ data: null });
    useEffect(() => {
        const fetchApi = async () => {
            const { data } = await server.fetch<T>({ 
                query, 
                ...(variables && { variables }) 
            });
            setState({ data });
          };
          fetchApi();
    }, [query, variables, refreshId])   
    return { state, refreshListings }; 
  };