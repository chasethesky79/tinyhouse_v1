import { useState, useEffect, useCallback } from "react";
import { server } from ".";

interface State<T> {
    [x: string]: any;
    data: T | null,
    loading: boolean
}

interface Result<T> {
    state: State<T> | null;
    refreshListings: () => void
}

  export const useQuery = <T = any>(query: string): Result<T> => {
    const [state, setState] = useState<State<T> | null>({ data: null, loading: false });
    const refreshListings = useCallback(() => {
        const fetchApi = async () => {
            setState({ data: null, loading: true })
            const { data } = await server.fetch<T>({ query });
            setState({ data, loading: false });
          };
          fetchApi();
    }, [query]);
    useEffect(() => refreshListings(), [refreshListings])
    return { state, refreshListings };
  };